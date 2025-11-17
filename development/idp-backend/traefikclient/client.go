package traefikclient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
	"strings"
	"time"
)

const defaultBaseURL = "http://localhost:9000/api"

// Client knows how to talk to the Traefik HTTP API.
type Client struct {
	baseURL    string
	httpClient *http.Client
}

func NewClient(baseURL string) *Client {
	if baseURL == "" {
		baseURL = defaultBaseURL
	}
	baseURL = strings.TrimSuffix(baseURL, "/")
	return &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

type Router struct {
	Name        string   `json:"name"`
	Rule        string   `json:"rule"`
	Service     string   `json:"service"`
	Status      string   `json:"status"`
	EntryPoints []string `json:"entryPoints"`
	Provider    string   `json:"provider"`
	Middlewares []string `json:"middlewares"`
}

type Service struct {
	Name        string   `json:"name"`
	Status      string   `json:"status"`
	Provider    string   `json:"provider"`
	ServerCount int      `json:"serverCount"`
	Servers     []string `json:"servers"`
}

type Middleware struct {
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Provider    string `json:"provider"`
	Status      string `json:"status"`
}

type routerPayload struct {
	Name        string   `json:"name"`
	Rule        string   `json:"rule"`
	Service     string   `json:"service"`
	Status      string   `json:"status"`
	EntryPoints []string `json:"entryPoints"`
	Provider    string   `json:"provider"`
	Middlewares []string `json:"middlewares"`
}

func (c *Client) GetRouters(ctx context.Context) ([]Router, error) {
	var payload []routerPayload
	if err := c.get(ctx, "/http/routers", &payload); err != nil {
		return nil, err
	}

	routers := make([]Router, 0, len(payload))
	for _, r := range payload {
		routers = append(routers, Router{
			Name:        r.Name,
			Rule:        r.Rule,
			Service:     r.Service,
			Status:      r.Status,
			EntryPoints: r.EntryPoints,
			Provider:    r.Provider,
			Middlewares: r.Middlewares,
		})
	}

	sort.Slice(routers, func(i, j int) bool {
		return routers[i].Name < routers[j].Name
	})

	return routers, nil
}

type servicePayload struct {
	Name         string `json:"name"`
	Status       string `json:"status"`
	Provider     string `json:"provider"`
	LoadBalancer struct {
		Servers []struct {
			URL string `json:"url"`
		} `json:"servers"`
	} `json:"loadBalancer"`
}

func (c *Client) GetServices(ctx context.Context) ([]Service, error) {
	var payload []servicePayload
	if err := c.get(ctx, "/http/services", &payload); err != nil {
		return nil, err
	}

	services := make([]Service, 0, len(payload))
	for _, s := range payload {
		var servers []string
		for _, server := range s.LoadBalancer.Servers {
			servers = append(servers, server.URL)
		}
		services = append(services, Service{
			Name:        s.Name,
			Status:      s.Status,
			Provider:    s.Provider,
			ServerCount: len(servers),
			Servers:     servers,
		})
	}

	sort.Slice(services, func(i, j int) bool {
		return services[i].Name < services[j].Name
	})

	return services, nil
}

type middlewarePayload struct {
	Name       string                     `json:"name"`
	Status     string                     `json:"status"`
	Provider   string                     `json:"provider"`
	Type       string                     `json:"type"`
	Middleware map[string]json.RawMessage `json:"middleware"`
}

func (c *Client) GetMiddlewares(ctx context.Context) ([]Middleware, error) {
	var payload []middlewarePayload
	if err := c.get(ctx, "/http/middlewares", &payload); err != nil {
		return nil, err
	}

	middlewares := make([]Middleware, 0, len(payload))
	for _, data := range payload {
		middlewareType := data.Type
		description := ""

		for key, value := range data.Middleware {
			if middlewareType == "" {
				middlewareType = key
			}
			description = formatJSON(value)
			break
		}

		middlewares = append(middlewares, Middleware{
			Name:        data.Name,
			Type:        middlewareType,
			Description: description,
			Provider:    data.Provider,
			Status:      data.Status,
		})
	}

	sort.Slice(middlewares, func(i, j int) bool {
		return middlewares[i].Name < middlewares[j].Name
	})

	return middlewares, nil
}

func (c *Client) get(ctx context.Context, path string, target interface{}) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("%s%s", c.baseURL, path), nil)
	if err != nil {
		return err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return fmt.Errorf("traefik api returned %s", resp.Status)
	}

	return json.NewDecoder(resp.Body).Decode(target)
}

func formatJSON(raw json.RawMessage) string {
	if len(raw) == 0 {
		return ""
	}
	var buf bytes.Buffer
	if err := json.Indent(&buf, raw, "", "  "); err != nil {
		return string(raw)
	}
	return buf.String()
}
