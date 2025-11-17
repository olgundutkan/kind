package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"idp-backend/traefikclient"
)

type Item struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	CreatedAt   string `json:"created_at"`
}

var (
	db            *sql.DB
	traefikClient *traefikclient.Client
)

func main() {
	// Load .env file
	godotenv.Load()

	// Database connection
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "30432")
	dbUser := getEnv("DB_USER", "idp_user")
	dbPassword := getEnv("DB_PASSWORD", "idp_pass")
	dbName := getEnv("DB_NAME", "idp")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Test connection
	if err = db.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	log.Println("Database connected successfully")

	// Create table
	createTable()

	// Setup Gin
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	traefikClient = traefikclient.NewClient(getEnv("TRAEFIK_API_URL", ""))

	// Routes
	r.GET("/health", healthCheck)
	r.GET("/api/items", getItems)
	r.GET("/api/items/:id", getItem)
	r.POST("/api/items", createItem)
	r.PUT("/api/items/:id", updateItem)
	r.DELETE("/api/items/:id", deleteItem)
	r.GET("/api/traefik/overview", getTraefikOverview)

	port := getEnv("PORT", "3001")
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}

func createTable() {
	query := `
		CREATE TABLE IF NOT EXISTS items (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			description TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal("Failed to create table:", err)
	}
	log.Println("Table initialized")
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{"status": "ok"})
}

func getItems(c *gin.Context) {
	rows, err := db.Query("SELECT id, name, description, created_at FROM items ORDER BY id DESC")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	items := []Item{}
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.ID, &item.Name, &item.Description, &item.CreatedAt); err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		items = append(items, item)
	}

	c.JSON(200, items)
}

func getItem(c *gin.Context) {
	id := c.Param("id")
	var item Item

	err := db.QueryRow("SELECT id, name, description, created_at FROM items WHERE id = $1", id).
		Scan(&item.ID, &item.Name, &item.Description, &item.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(404, gin.H{"error": "Item not found"})
			return
		}
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, item)
}

func createItem(c *gin.Context) {
	var input struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var item Item
	err := db.QueryRow(
		"INSERT INTO items (name, description) VALUES ($1, $2) RETURNING id, name, description, created_at",
		input.Name, input.Description,
	).Scan(&item.ID, &item.Name, &item.Description, &item.CreatedAt)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, item)
}

func updateItem(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var item Item
	err := db.QueryRow(
		"UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description, created_at",
		input.Name, input.Description, id,
	).Scan(&item.ID, &item.Name, &item.Description, &item.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(404, gin.H{"error": "Item not found"})
			return
		}
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, item)
}

func deleteItem(c *gin.Context) {
	id := c.Param("id")

	result, err := db.Exec("DELETE FROM items WHERE id = $1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		c.JSON(404, gin.H{"error": "Item not found"})
		return
	}

	c.JSON(200, gin.H{"message": "Item deleted"})
}

func getTraefikOverview(c *gin.Context) {
	if traefikClient == nil {
		c.JSON(500, gin.H{"error": "Traefik client is not initialized"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	routers, err := traefikClient.GetRouters(ctx)
	if err != nil {
		c.JSON(502, gin.H{"error": "Failed to fetch routers", "details": err.Error()})
		return
	}

	services, err := traefikClient.GetServices(ctx)
	if err != nil {
		c.JSON(502, gin.H{"error": "Failed to fetch services", "details": err.Error()})
		return
	}

	middlewares, err := traefikClient.GetMiddlewares(ctx)
	if err != nil {
		c.JSON(502, gin.H{"error": "Failed to fetch middlewares", "details": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"routers":     routers,
		"services":    services,
		"middlewares": middlewares,
	})
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
