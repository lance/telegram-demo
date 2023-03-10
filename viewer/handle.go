package function

import (
	"context"
	"fmt"

	"github.com/cloudevents/sdk-go/v2/event"
)

// Handle accepts a CloudEvent and logs its Data to stdout.
func Handle(ctx context.Context, e event.Event) (*event.Event, error) {
	fmt.Printf("☁️  cloudevents.Event\n%s", e)
	return nil, nil
}
