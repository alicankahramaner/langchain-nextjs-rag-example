import { Attachment, AttachmentPreview, AttachmentRemove, Attachments } from "./attachments";
import { usePromptInputAttachments } from "./prompt-input";

export default function PromptInputAttachmentsDisplay() {
    const attachments = usePromptInputAttachments();
    if (attachments.files.length === 0) {
        return null;
    }
    return (
        <Attachments variant="inline">
            {attachments.files.map((attachment) => (
                <Attachment
                    data={attachment}
                    key={attachment.id}
                    onRemove={() => attachments.remove(attachment.id)}
                >
                    <AttachmentPreview />
                    <AttachmentRemove />
                </Attachment>
            ))}
        </Attachments>
    );
};