# syntax = docker/dockerfile:1
FROM golang:1.23.4-alpine AS go-build

WORKDIR /app

# Copy and download Go dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the application source code
COPY . .

# Build the Go application
RUN go build -o api ./main.go

# Run the Go application
EXPOSE 8080
CMD ["./api"]
