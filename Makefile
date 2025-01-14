.PHONY: install start server build test dc-build dc-up dc-down clean help

install:
	@echo "Installing dependencies..."
	npm install

start:
	@echo "Starting development server..."
	npm start

server:
	@echo "Running Node server..."
	npm run server

build:
	@echo "Building production version..."
	npm run build

test:
	@echo "Running tests..."
	npm test

dc-build:
	@echo "Building Docker Compose services..."
	docker-compose build

dc-up:
	@echo "Starting Docker Compose services..."
	docker-compose up -d

dc-down:
	@echo "Stopping Docker Compose services..."
	docker-compose down

clean:
	@echo "Cleaning up..."
	rm -rf node_modules package-lock.json

help:
	@echo "Available commands:"
	@echo "  make install             - Install dependencies"
	@echo "  make start               - Start development server"
	@echo "  make server 			  - Run Node server"
	@echo "  make build               - Build production version"
	@echo "  make test                - Run tests"
	@echo "  make dc-build            - Build Docker Compose services"
	@echo "  make dc-up               - Start Docker Compose services"
	@echo "  make dc-down             - Stop Docker Compose services"
	@echo "  make clean               - Clean up project"
	@echo "  make help                - Show help information"
