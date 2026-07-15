import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useI18n } from "@/lib/i18n";

export function DisableSourceDialog({
  open, onOpenChange, onConfirm, count = 1,
}: { open: boolean; onOpenChange: (v: boolean) => void; onConfirm: () => void; count?: number }) {
  const { t } = useI18n();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("disable.title")}{count > 1 ? ` (${count})` : ""}</AlertDialogTitle>
          <AlertDialogDescription>{t("disable.desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{t("disable.confirm")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}