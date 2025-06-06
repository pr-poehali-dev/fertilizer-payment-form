import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Fertilizer {
  id: string;
  name: string;
  type: string;
  price: number;
  unit: string;
  description: string;
  inStock: boolean;
}

interface FertilizerCatalogProps {
  onSelect: (fertilizer: Fertilizer, quantity: number) => void;
  selectedItems: Array<{ fertilizer: Fertilizer; quantity: number }>;
}

const fertilizers: Fertilizer[] = [
  {
    id: "1",
    name: "Азофоска NPK 16:16:16",
    type: "Комплексное",
    price: 850,
    unit: "кг",
    description: "Универсальное удобрение для всех видов растений",
    inStock: true,
  },
  {
    id: "2",
    name: "Суперфосфат",
    type: "Фосфорное",
    price: 650,
    unit: "кг",
    description: "Основное фосфорное удобрение для корневой системы",
    inStock: true,
  },
  {
    id: "3",
    name: "Калийная соль",
    type: "Калийное",
    price: 720,
    unit: "кг",
    description: "Повышает устойчивость растений к болезням",
    inStock: true,
  },
  {
    id: "4",
    name: "Карбамид (Мочевина)",
    type: "Азотное",
    price: 890,
    unit: "кг",
    description: "Высокоэффективное азотное удобрение",
    inStock: false,
  },
];

const FertilizerCatalog = ({
  onSelect,
  selectedItems,
}: FertilizerCatalogProps) => {
  const getSelectedQuantity = (fertilizerId: string) => {
    const item = selectedItems.find(
      (item) => item.fertilizer.id === fertilizerId,
    );
    return item ? item.quantity : 0;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Каталог удобрений
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {fertilizers.map((fertilizer) => (
          <Card
            key={fertilizer.id}
            className={`transition-all ${!fertilizer.inStock ? "opacity-60" : "hover:shadow-md"}`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{fertilizer.name}</CardTitle>
                <Badge variant={fertilizer.inStock ? "default" : "secondary"}>
                  {fertilizer.inStock ? "В наличии" : "Нет в наличии"}
                </Badge>
              </div>
              <Badge variant="outline" className="w-fit">
                {fertilizer.type}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {fertilizer.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  {fertilizer.price} ₽/{fertilizer.unit}
                </span>
                {fertilizer.inStock && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentQty = getSelectedQuantity(fertilizer.id);
                        if (currentQty > 0) {
                          onSelect(fertilizer, currentQty - 1);
                        }
                      }}
                      disabled={getSelectedQuantity(fertilizer.id) === 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">
                      {getSelectedQuantity(fertilizer.id)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onSelect(
                          fertilizer,
                          getSelectedQuantity(fertilizer.id) + 1,
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FertilizerCatalog;
