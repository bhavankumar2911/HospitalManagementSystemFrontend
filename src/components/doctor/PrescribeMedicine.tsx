import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import createDropdownOptions from "../../lib/app/createDropdownOptions";
import getConsumingIntervalOptions from "../../lib/app/getConsumingIntervalOptions";
import SubmitButton from "../app/SubmitButton";

const PrescribeMedicine = ({ patientId }: { patientId: string }) => {
  const [form] = Form.useForm();

  const [medicineOptions, setMedicineOptions] = useState<DefaultOptionType[]>(
    []
  );

  const fetchAllMedicines = async () => {
    const response = await axios.get("/medicine");

    return response.data.data;
  };

  // load medicines
  const { isLoading, isError, error } = useQuery(
    "medicinesQuery",
    fetchAllMedicines,
    {
      onSuccess: (data) => {
        setMedicineOptions([
          ...data.map((medicine: any) => {
            return {
              label: medicine.name,
              value: medicine.id,
            };
          }),
        ]);
      },
    }
  );

  const getProcessedPrescriptionItems = () => {
    const { prescriptionItems } = form.getFieldsValue();
    const processedPrescriptionItems = [];

    if (prescriptionItems == undefined || prescriptionItems.length == 0)
      throw new Error("Add atleast one prescription item.");

    for (let i = 0; i < prescriptionItems.length; i++) {
      const prescriptionItem = prescriptionItems[i];
      const { medicineId, dosageInMG, noOfDays } = prescriptionItem;

      // create separate presscription item for intervals
      for (let j = 0; j < prescriptionItem.consumingInterval.length; j++) {
        const consumingInterval = prescriptionItem.consumingInterval[j];

        processedPrescriptionItems.push({
          medicineId: parseInt(medicineId),
          dosageInMG: parseInt(dosageInMG),
          consumingInterval: parseInt(consumingInterval),
          noOfDays: parseInt(noOfDays),
        });
      }
    }

    return processedPrescriptionItems;
  };

  const savePrescription = async () => {
    const processedPrescriptionItems = getProcessedPrescriptionItems();
    const response = await axios.post("/prescription", {
      patientId,
      prescriptionItems: processedPrescriptionItems,
    });

    return response.data;
  };

  // save prescription
  const { mutate, isLoading: savingPrescription } = useMutation(
    savePrescription,
    {
      onError: (err) => {
        if (err instanceof AxiosError && err.response)
          message.error(err.response.data.message);
        else if (err instanceof Error) message.error(err.message);
      },
      onSuccess: (data) => {
        message.success(data.message);
        form.resetFields();
      },
    }
  );

  if (isLoading) return <Skeleton active />;

  if (isError) {
    if (error instanceof AxiosError && error.response)
      return (
        <Alert type="error" message={error.response.data.message} banner />
      );

    return <Alert type="error" message={"Something went wrong"} banner />;
  }

  return (
    <section>
      <Typography.Title level={2}>Prescribe Medicine</Typography.Title>
      <Form
        name="prescribe"
        onSubmitCapture={() => mutate()}
        // style={{ maxWidth: 600 }}
        autoComplete="off"
        form={form}
      >
        <Form.List name="prescriptionItems">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Row gutter={20} style={{ width: "100%" }}>
                    <Col span={24} md={12} lg={6}>
                      <Form.Item
                        {...restField}
                        hasFeedback
                        name={[name, "medicineId"]}
                        validateDebounce={1000}
                        rules={[
                          {
                            required: true,
                            message: "Medicine is required.",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Medicine"
                          options={medicineOptions}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24} md={12} lg={6}>
                      <Form.Item
                        {...restField}
                        hasFeedback
                        name={[name, "dosageInMG"]}
                        validateDebounce={1000}
                        rules={[
                          {
                            required: true,
                            message: "Dosage is required.",
                          },
                          {
                            pattern: /^[1-9][0-9]*$/,
                            message:
                              "Dosage must be in number. Minimum dosage is 1 mg.",
                          },
                        ]}
                      >
                        <Input placeholder="Dosage in mg" />
                      </Form.Item>
                    </Col>

                    <Col span={24} md={12} lg={6}>
                      <Form.Item
                        {...restField}
                        hasFeedback
                        name={[name, "consumingInterval"]}
                        validateDebounce={1000}
                        rules={[
                          {
                            required: true,
                            message: "Consuming Interval is required.",
                          },
                        ]}
                      >
                        <Select
                          showSearch={false}
                          mode="multiple"
                          placeholder="Consuming Interval"
                          options={createDropdownOptions(
                            getConsumingIntervalOptions()
                          )}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24} md={12} lg={6}>
                      <Form.Item
                        {...restField}
                        hasFeedback
                        name={[name, "noOfDays"]}
                        validateDebounce={1000}
                        rules={[
                          {
                            required: true,
                            message: "Duration is required.",
                          },
                          {
                            pattern: /^[1-9][0-9]*$/,
                            message:
                              "Duration must be in number. Minimum duration is 1 day.",
                          },
                        ]}
                      >
                        <Input placeholder="Duration in days" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add prescription item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <SubmitButton loading={savingPrescription} form={form}>
            Save prescription
          </SubmitButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default PrescribeMedicine;
