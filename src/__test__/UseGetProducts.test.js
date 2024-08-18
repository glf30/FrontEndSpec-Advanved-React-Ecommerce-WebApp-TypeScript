import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { useGetProducts } from "../hooks/useGetProducts";

// Create a mock of axios
jest.mock("axios");

describe("useGetProducts Hook Tests", () => {
    
    // Test 1
  test("fetches products from API when fetchProducts is called", async () => {
    
    // Mock data to return from API
    const mockResponse = { data: [{ product_id: 1, name: "Product 1", price: 10}] };

    // Mock the API call to return our mockResponse
    axios.get.mockResolvedValue(mockResponse);

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useGetProducts());

    // Trigger the fetchProducts function
    act(() => {
      result.current.fetchProducts();
    });

    // Wait for the hook to update after the API call
    await waitForNextUpdate();

    // Check if the axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:5000/products");

    // Check if the products state was updated with the mock data
    expect(result.current.products).toEqual(mockResponse.data);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  // Test 2
  test("handles error when fetchProducts fails", async () => {
    // Mock the API call to throw an error
    axios.get.mockRejectedValue(new Error("Error fetching products"));

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useGetProducts());

    // Trigger the fetchProducts function
    act(() => {
      result.current.fetchProducts();
    });

    // Wait for the hook to update after the API call
    await waitForNextUpdate();

    // Check if the error state was updated
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Error fetching products");
  });

});