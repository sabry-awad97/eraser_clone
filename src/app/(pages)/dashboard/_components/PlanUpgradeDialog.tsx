import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FreePlan from './FreePlan';
import UpgradePlan from './UpgradePlan';

const PlanUpgradeDialog = () => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Upgrade Plan</DialogTitle>
        <DialogDescription>
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
              <UpgradePlan />
              <FreePlan />
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild></DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default PlanUpgradeDialog;
