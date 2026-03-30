package image_entity

type Image struct {
	Data        []byte `bson:"data"`
	ContentType string `bson:"contentType"`
}
