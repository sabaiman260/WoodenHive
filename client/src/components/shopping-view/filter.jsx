import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ChevronDown, X } from "lucide-react";

const sectionLabels = {
  category: "Category",
  price: "Price",
  woodType: "Wood Type",
  bestSelling: "Best Selling",
};

function ProductFilter({ activeFilter, handleFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden mb-3 flex items-center gap-2">
        <button
          className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-md font-semibold"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          {open ? "Hide Filters" : "Filter & Sort"}
        </button>
        {activeFilter && (
          <button
            className="flex items-center gap-1 border rounded-md px-3 py-2 text-sm font-medium"
            onClick={() => handleFilter(activeFilter.section, activeFilter.value)}
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div
        className={`${open ? "block" : "hidden"} md:block bg-background rounded-lg shadow-sm`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Filters</h2>
          {activeFilter && (
            <button
              className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => handleFilter(activeFilter.section, activeFilter.value)}
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
        <div className="p-2 md:p-4">
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment key={keyItem}>
              <details className="group py-2" open>
                <summary className="flex items-center justify-between cursor-pointer list-none py-1 px-2">
                  <span className="text-base font-bold">
                    {sectionLabels[keyItem] || keyItem}
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-2 mt-2 px-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-2 py-1"
                    >
                      <Checkbox
                        checked={
                          activeFilter?.section === keyItem &&
                          activeFilter?.value === option.id
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </details>
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
