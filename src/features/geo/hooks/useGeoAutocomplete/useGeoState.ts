import { useState } from "react";
import type { GeoUIEntity } from "../../ui/types/geo.ui.types";

export function useGeoState() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<GeoUIEntity | null>(null);
  const [items, setItems] = useState<GeoUIEntity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    value,
    setValue,
    selected,
    setSelected,
    items,
    setItems,
    isOpen,
    setIsOpen,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}
