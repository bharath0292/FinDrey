package response_enum

type ResponseMessage int

const (
	INVALID_ID ResponseMessage = iota
	NOT_FOUND
	INVALID_DATA
	ALREADY_EXISTS
	INVALID_REQUEST
)

func (message ResponseMessage) String() string {
	switch message {
	case INVALID_ID:
		return "Invalid ID"
	case NOT_FOUND:
		return "Not found"
	case INVALID_DATA:
		return "Invalid data"
	case ALREADY_EXISTS:
		return "Already exists"
	case INVALID_REQUEST:
		return "Invalid request"
	default:
		return ""
	}
}
