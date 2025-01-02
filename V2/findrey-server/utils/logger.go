package utils

import (
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/natefinch/lumberjack"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var username = ""

func InitLogger() {
	zerolog.TimeFieldFormat = "2006-01-02 03:04PM"
	consoleWriter := zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: "2006-01-02 03:04PM"}

	consoleWriter.FormatLevel = func(i interface{}) string {
		if i == nil {
			return ""
		}
		return " | " + strings.ToUpper(i.(string))[:3] + " | "
	}
	consoleWriter.FormatCaller = func(i interface{}) string {
		if i == nil {
			return ""
		}
		return i.(string) + " | "
	}
	consoleWriter.FormatMessage = func(i interface{}) string {
		return username + " | " + i.(string)
	}

	// Set up file rotation using lumberjack
	rotatingLogger := &lumberjack.Logger{
		Filename:   "./logs/log.txt",
		MaxSize:    50,   // Max size in MB before creating a new log file
		MaxBackups: 3600, // Max number of old log files to retain
		MaxAge:     3600, // Max age in days before deleting old logs
		Compress:   true, // Compress old log files
	}

	// Create a multi-output writer to log to both console and file
	multi := zerolog.MultiLevelWriter(consoleWriter, rotatingLogger)
	// multi := zerolog.MultiLevelWriter(consoleWriter)

	zerolog.CallerMarshalFunc = func(pc uintptr, file string, line int) string {
		return filepath.Base(file) + ":" + strconv.Itoa(line)
	}

	// Set the global logger with Caller and username fields
	log.Logger = zerolog.New(multi).With().
		Caller().
		Timestamp().
		Logger()

	log.Info().Msg("Zerolog initialized.")
}

// SetUsername sets the username for the logger after the user logs in.
func SetUsername(user string) {
	username = user
	log.Logger = log.With().Str("username", username).Logger()
	log.Info().Msg("User logged in.")
}
