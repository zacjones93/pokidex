#!/bin/bash
# Universal note creation script with template support
# Usage: ./create-note.sh [--template TYPE] "Title" "file:line" "Body"

set -e

# Parse template flag
TEMPLATE="default"
if [[ "$1" == "--template" ]]; then
    TEMPLATE="$2"
    shift 2
fi

# Get timestamp and date
TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
DATE=$(date +%Y-%m-%d)
TIME=$(echo $TIMESTAMP | cut -d'-' -f4-6 | sed 's/-/:/g')

# Template-specific configuration
case "$TEMPLATE" in
    "review")
        NOTE_DIR="docs/notes/reviews"
        NOTE_FILE="${NOTE_DIR}/${DATE}.md"
        FILE_HEADER="## Code Reviews - ${DATE}\n\nDaily code review findings and recommendations.\n"
        SEPARATOR="---\n\n"
        # Args for review template
        COMPONENT_NAME="$1"
        FILE_PATH="$2"
        REVIEW_BODY="$3"

        if [ -z "$COMPONENT_NAME" ] || [ -z "$FILE_PATH" ] || [ -z "$REVIEW_BODY" ]; then
            echo "Usage: $0 --template review \"Component/File Name\" \"path/to/file.tsx\" \"Review findings markdown\""
            exit 1
        fi
        ;;

    "default")
        NOTE_DIR="docs/notes"
        NOTE_FILE="${NOTE_DIR}/${DATE}.md"
        FILE_HEADER="## [${DATE}]"
        SEPARATOR=""
        # Args for default template
        TITLE="$1"
        FILE_REF="$2"
        BODY="$3"

        if [ -z "$TITLE" ] || [ -z "$FILE_REF" ]; then
            echo "Usage: $0 [--template default] \"Note title\" \"file/path:line\" \"Body\""
            exit 1
        fi
        ;;

    *)
        echo "Unknown template: $TEMPLATE"
        echo "Available templates: default, review"
        exit 1
        ;;
esac

# Create notes directory
mkdir -p "$NOTE_DIR"

# Initialize file if needed
if [ -f "$NOTE_FILE" ]; then
    echo "Appending to existing note file..."
else
    echo -e "$FILE_HEADER" > "$NOTE_FILE"
    echo "Created new note file: $NOTE_FILE"
fi

# Append based on template
case "$TEMPLATE" in
    "review")
        cat >> "$NOTE_FILE" << EOF

${SEPARATOR}### [${TIME}] - Code Review: ${COMPONENT_NAME}

**File**: ${FILE_PATH}

${REVIEW_BODY}

EOF
        ;;

    "default")
        cat >> "$NOTE_FILE" << EOF

### [${TIME}] - ${TITLE}

- **File**: ${FILE_REF}
${BODY}

EOF
        ;;
esac

echo "✓ Note added to $NOTE_FILE"
echo "View: cat $NOTE_FILE"
