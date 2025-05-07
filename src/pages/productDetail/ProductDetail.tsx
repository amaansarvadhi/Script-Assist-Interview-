import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Grid,
  Loader,
  Text,
  Title,
  Image,
  Badge,
  List,
  Group,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import { fetchProductDetail, fetchRelatedProducts } from "@/services/ApiProductService";


const ProductDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["product", id], () =>
    fetchProductDetail(id as string)
  );

  const product = data?.data;

  const { data: relatedData } = useQuery(
    ["relatedProducts", product?.category],
    () => fetchRelatedProducts(product?.category),
    { enabled: !!product?.category }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Text color="red" size="xl">
          Failed to load product details. Please try again later.
        </Text>
      </div>
    );
  }

  return (
    <div className="p-4 lg:px-4 lg:py-12 shadow-lg">
      <Card
        shadow="xl"
        padding="lg"
        radius="xl"
        className="bg-white overflow-hidden border border-gray-200"
      >
        <Grid>
          {/* Product Images and Details */}
          <Grid.Col span={12}>
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              className="gap-8"
            >
              <div className="flex justify-center items-center cursor-pointer bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  height={400}
                  width="auto"
                  className="object-contain p-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div className="space-y-6">
                <Title
                  order={2}
                  className="font-bold text-gray-900 tracking-tight"
                >
                  {product.title}
                </Title>
                <Text size="md" className="text-gray-700">
                  {product.description}
                </Text>
                <Badge
                  color="teal"
                  size="lg"
                  variant="filled"
                  className="text-white text-sm px-4 py-2"
                >
                  Category: {product.category}
                </Badge>
                <div className="flex items-center space-x-4">
                  <Text
                    size="3xl"
                    weight={800}
                    className="text-indigo-600 font-semibold"
                  >
                    ${product.price.toFixed(2)}
                  </Text>
                  <Badge
                    color="yellow"
                    size="lg"
                    className="bg-yellow-200 text-yellow-800 font-semibold"
                  >
                    {product.discountPercentage}% Off
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Text className="text-gray-600">Rating:</Text>
                  <Text className="text-yellow-500 font-semibold">
                    {product.rating}
                    <span className="text-gray-500">/5</span>
                  </Text>
                </div>
                <Text size="sm" className="text-gray-600">
                  <strong>Stock:</strong> {product.stock} units available
                </Text>
              </div>
            </SimpleGrid>
          </Grid.Col>

          {/* Divider */}
          <Divider my="lg" className="border-gray-300" />

          {/* Additional Details */}
          <Grid.Col span={12}>
            <Title order={4} className="font-semibold text-gray-800">
              Additional Information
            </Title>
            <List
              withPadding
              size="sm"
              className="mt-4 bg-gray-50 p-4 rounded-xl shadow-sm"
            >
              <List.Item className="text-gray-700">
                <strong>Brand:</strong> {product.brand}
              </List.Item>
              <List.Item className="text-gray-700">
                <strong>SKU:</strong> {product.sku}
              </List.Item>
              <List.Item className="text-gray-700">
                <strong>Warranty:</strong> {product.warrantyInformation}
              </List.Item>
              <List.Item className="text-gray-700">
                <strong>Shipping:</strong> {product.shippingInformation}
              </List.Item>
              <List.Item className="text-gray-700">
                <strong>Availability:</strong> {product.availabilityStatus}
              </List.Item>
            </List>
          </Grid.Col>

          {/* Divider */}
          <Divider my="lg" className="border-gray-300" />

          {/* Related Products */}
          {relatedData && relatedData?.data?.products?.length > 0 && (
            <Grid.Col span={12}>
              <Title order={4} className="font-semibold text-gray-800">
                Related Products
              </Title>
              <SimpleGrid cols={3} spacing="lg">
                {relatedData?.data?.products?.map((relatedProduct: any) => (
                  <Card
                    key={relatedProduct.id}
                    shadow="sm"
                    padding="lg"
                    radius="xl"
                    className="bg-gray-50 border border-gray-200"
                  >
                    <Image
                      src={relatedProduct.thumbnail}
                      alt={relatedProduct.title}
                      height={180}
                      width="auto"
                      className="object-contain mb-4"
                    />
                    <Title order={4} className="text-center text-gray-900">
                      {relatedProduct.title}
                    </Title>
                    <Text className="text-center text-gray-700">
                      ${relatedProduct.price.toFixed(2)}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </Grid.Col>
          )}

          {/* Divider */}
          <Divider my="lg" className="border-gray-300" />

          {/* Reviews */}
          <Grid.Col span={12}>
            <Title order={4} className="font-semibold text-gray-800">
              Customer Reviews
            </Title>
            {product?.reviews?.length > 0 ? (
              <div className="mt-6 grid gap-8">
                {product?.reviews?.map((review:any, index:any) => (
                  <Card
                    key={index}
                    shadow="sm"
                    padding="md"
                    radius="lg"
                    className="bg-gray-50 border border-gray-200"
                  >
                    <Group position="apart">
                      <Text size="sm" weight={700} className="text-gray-800">
                        {review.reviewerName}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </Group>
                    <Text size="sm" mt="xs" className="text-gray-700">
                      {review.comment}
                    </Text>
                    <div className="flex items-center mt-2 space-x-1">
                      <Text size="sm" className="text-yellow-500">
                        ★
                      </Text>
                      <Text size="sm">{review.rating} / 5</Text>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Text size="sm" color="dimmed">
                No reviews available for this product.
              </Text>
            )}
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
};

export default ProductDetail;
