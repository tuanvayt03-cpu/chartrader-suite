import { PageHeader } from "./page-header";

export function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}