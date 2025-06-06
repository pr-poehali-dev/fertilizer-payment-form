import React, { useState } from "react";
import FertilizerCatalog from "@/components/FertilizerCatalog";
import PaymentForm from "@/components/PaymentForm";
import CustomerForm from "@/components/CustomerForm";
import OrderSummary from "@/components/OrderSummary";

interface Fertilizer {
  id: string;
  name: string;
  type: string;
  price: number;
  unit: string;
  description: string;
  inStock: boolean;
}

interface OrderItem {
  fertilizer: Fertilizer;
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

const Index = () => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    bankName: "",
    accountNumber: "",
    phoneNumber: "",
  });

  const handleFertilizerSelect = (fertilizer: Fertilizer, quantity: number) => {
    setSelectedItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.fertilizer.id === fertilizer.id,
      );

      if (quantity === 0) {
        // Remove item if quantity is 0
        return prevItems.filter((item) => item.fertilizer.id !== fertilizer.id);
      }

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { fertilizer, quantity }];
      }
    });
  };

  const handleCustomerDataChange = (data: CustomerData) => {
    setCustomerData(data);
  };

  const handlePaymentDataChange = (data: PaymentData) => {
    setPaymentData(data);
  };

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.fertilizer.price * item.quantity,
    0,
  );
  const deliveryFee = totalAmount > 5000 ? 0 : 500;
  const finalAmount = totalAmount + deliveryFee;

  const handleOrderSubmit = () => {
    // Детальная информация для подтверждения
    const orderDetails = {
      items: selectedItems,
      customer: customerData,
      payment: paymentData,
      amounts: { totalAmount, deliveryFee, finalAmount },
    };

    console.log("Данные заказа:", orderDetails);
    alert("Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.");

    // Reset form
    setSelectedItems([]);
    setCustomerData({
      name: "",
      email: "",
      phone: "",
      paymentMethod: "",
    });
    setPaymentData({
      method: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
      bankName: "",
      accountNumber: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌱 АгроМаркет
          </h1>
          <p className="text-xl text-gray-600">
            Качественные удобрения для вашего урожая
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <FertilizerCatalog
              onSelect={handleFertilizerSelect}
              selectedItems={selectedItems}
            />

            <CustomerForm onDataChange={handleCustomerDataChange} />

            <PaymentForm
              onDataChange={handlePaymentDataChange}
              amount={finalAmount}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                items={selectedItems}
                customerData={customerData}
                paymentData={paymentData}
                onSubmit={handleOrderSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
