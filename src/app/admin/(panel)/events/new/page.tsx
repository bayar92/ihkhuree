import { AdminHeader } from "@/components/admin/ui";
import { EventForm } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <AdminHeader title="Шинэ арга хэмжээ" />
      <EventForm />
    </div>
  );
}
