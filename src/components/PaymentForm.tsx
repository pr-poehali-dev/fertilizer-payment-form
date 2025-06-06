import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

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

interface PaymentFormProps {
  onDataChange: (data: PaymentData) => void;
  amount: number;
}

const PaymentForm = ({ onDataChange, amount }: PaymentFormProps) => {
  const form = useForm<PaymentData>({
    defaultValues: {
      method: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
      bankName: "",
      accountNumber: "",
      phoneNumber: "",
    },
  });

  const watchedData = form.watch();
  const selectedMethod = form.watch("method");

  React.useEffect(() => {
    onDataChange(watchedData);
  }, [watchedData, onDataChange]);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{2})/, "$1/$2");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="CreditCard" size={20} />
          Способ оплаты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="method"
              rules={{ required: "Выберите способ оплаты" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите способ оплаты *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите способ оплаты" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <Icon name="CreditCard" size={16} />
                          Банковская карта
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <Icon name="Banknote" size={16} />
                          Наличные при получении
                        </div>
                      </SelectItem>
                      <SelectItem value="transfer">
                        <div className="flex items-center gap-2">
                          <Icon name="Building2" size={16} />
                          Банковский перевод
                        </div>
                      </SelectItem>
                      <SelectItem value="sbp">
                        <div className="flex items-center gap-2">
                          <Icon name="Smartphone" size={16} />
                          СБП (Система быстрых платежей)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedMethod === "card" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Данные банковской карты</h3>

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    rules={{
                      required: "Введите номер карты",
                      pattern: {
                        value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                        message: "Неверный формат номера карты",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер карты *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            {...field}
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value,
                              );
                              field.onChange(formatted);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      rules={{
                        required: "Введите срок действия",
                        pattern: {
                          value: /^\d{2}\/\d{2}$/,
                          message: "Формат: ММ/ГГ",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Срок действия *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ММ/ГГ"
                              maxLength={5}
                              {...field}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(
                                  e.target.value,
                                );
                                field.onChange(formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      rules={{
                        required: "Введите CVV",
                        pattern: {
                          value: /^\d{3}$/,
                          message: "CVV состоит из 3 цифр",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123"
                              maxLength={3}
                              type="password"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cardHolder"
                    rules={{ required: "Введите имя держателя карты" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя держателя карты *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="IVAN PETROV"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value.toUpperCase());
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {selectedMethod === "transfer" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Реквизиты для перевода</h3>

                  <FormField
                    control={form.control}
                    name="bankName"
                    rules={{ required: "Выберите банк" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Банк *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите банк" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sberbank">Сбербанк</SelectItem>
                            <SelectItem value="vtb">ВТБ</SelectItem>
                            <SelectItem value="gazprombank">
                              Газпромбанк
                            </SelectItem>
                            <SelectItem value="alfabank">Альфа-Банк</SelectItem>
                            <SelectItem value="tinkoff">
                              Тинькофф Банк
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    rules={{
                      required: "Введите номер счёта",
                      pattern: {
                        value: /^\d{20}$/,
                        message: "Номер счёта должен содержать 20 цифр",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер счёта *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="40817810012345678901"
                            maxLength={20}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {selectedMethod === "sbp" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Оплата через СБП</h3>

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    rules={{
                      required: "Введите номер телефона",
                      pattern: {
                        value: /^[\+]?[1-9][\d]{10,14}$/,
                        message: "Неверный формат телефона",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер телефона для СБП *</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (999) 123-45-67" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {selectedMethod === "cash" && (
              <>
                <Separator />
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" size={16} className="text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      Оплата при получении
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Вы можете оплатить заказ наличными при получении товара.
                    Приготовьте точную сумму: <strong>{amount} ₽</strong>
                  </p>
                </div>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
