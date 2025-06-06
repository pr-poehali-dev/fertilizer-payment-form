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

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
}

interface CustomerFormProps {
  onDataChange: (data: CustomerData) => void;
}

const CustomerForm = ({ onDataChange }: CustomerFormProps) => {
  const form = useForm<CustomerData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: "",
    },
  });

  const watchedData = form.watch();

  React.useEffect(() => {
    onDataChange(watchedData);
  }, [watchedData, onDataChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Данные покупателя</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Укажите ваше имя" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя *</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ваше имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Укажите email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неверный формат email",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.ru"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Укажите телефон",
                pattern: {
                  value: /^[\+]?[1-9][\d]{10,14}$/,
                  message: "Неверный формат телефона",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон *</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (999) 123-45-67" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              rules={{ required: "Выберите способ оплаты" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Способ оплаты *</FormLabel>
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
                      <SelectItem value="card">Банковская карта</SelectItem>
                      <SelectItem value="cash">
                        Наличные при получении
                      </SelectItem>
                      <SelectItem value="transfer">
                        Банковский перевод
                      </SelectItem>
                      <SelectItem value="sbp">
                        СБП (Система быстрых платежей)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
