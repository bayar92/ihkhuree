import { AdminHeader } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";

export const maxDuration = 120;

export default function NewNewsPage() {
  return (
    <div>
      <AdminHeader title="Шинэ мэдээ" />
      <NewsForm />
    </div>
  );
}
