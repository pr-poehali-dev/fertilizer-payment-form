import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  fertilizer: {
    id: string;
    name: string;
    price: number;
    unit: string;
  };
  quantity: number;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
}

interface PaymentData {
  method: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolder?: string;
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  customerData: CustomerData;
  paymentData: PaymentData;
  onSubmit: () => void;
}

const OrderSummary = ({
  items,
  customerData,
  paymentData,
  onSubmit,
}: OrderSummaryProps) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.fertilizer.price * item.quantity,
    0,
  );
  const deliveryFee = totalAmount > 5000 ? 0 : 500;
  const finalAmount = totalAmount + deliveryFee;

  const isFormValid =
    customerData.name &&
    customerData.email &&
    customerData.phone &&
    customerData.paymentMethod &&
    paymentData.method &&
    items.length > 0;

  const getPaymentInfo = () => {
    if (!paymentData.method) return null;

    switch (paymentData.method) {
      case "card":
        return `Карта •••• ${paymentData.cardNumber?.slice(-4) || "****"}`;
      case "cash":
        return "Наличные при получении";
      case "transfer":
        return `Банковский перевод (${paymentData.bankName || "Банк не выбран"})`;
      case "sbp":
        return `СБП ${paymentData.phoneNumber || ""}`;
      default:
        return "Способ оплаты не выбран";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Итоги заказа</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Корзина пуста</p>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.fertilizer.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.fertilizer.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.fertilizer.unit} ×{" "}
                      {item.fertilizer.price} ₽
                    </p>
                  </div>
                  <span className="font-medium">
                    {item.fertilizer.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Товары:</span>
                <span>{totalAmount} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                  {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}
                </span>
              </div>
              {totalAmount > 0 && totalAmount <= 5000 && (
                <p className="text-xs text-gray-500">
                  Бесплатная доставка от 5000 ₽
                </p>
              )}
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Итого:</span>
              <span className="text-green-600">{finalAmount} ₽</span>
            </div>

            {paymentData.method && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Оплата:</span>{" "}
                  {getPaymentInfo()}
                </p>
              </div>
            )}

            <Button
              onClick={onSubmit}
              disabled={!isFormValid}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {!isFormValid ? "Заполните все поля" : "Оформить заказ"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
