package controller_utils

import (
	"errors"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleFileUpload(c *gin.Context, formKey string) ([]byte, string, error) {
	var errorMsg string = "Failed to read file"
	file, fileHeader, err := c.Request.FormFile(formKey)
	if err != nil {
		if err == http.ErrMissingFile {
			return nil, "", nil
		}
		return nil, "", errors.New(errorMsg)
	}

	imageBytes, err := io.ReadAll(file)
	if err != nil {
		return nil, "", errors.New(errorMsg)
	}

	contentType := fileHeader.Header.Get("Content-Type")
	return imageBytes, contentType, nil
}

func IfNonEmpty[T comparable](newVal, existingVal T) T {
	var zero T
	if newVal != zero {
		return newVal
	}
	return existingVal
}

func DefaultIfEmpty(newVal *string, existingVal string) string {
	if newVal != nil {
		return *newVal
	}
	return existingVal
}

func DefaultIfNil(newVal *float64, existingVal float64) float64 {
	if newVal != nil {
		return *newVal
	}
	return existingVal
}
