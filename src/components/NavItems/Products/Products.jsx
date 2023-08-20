import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./ProductComponent.css"; // Import your custom CSS file for styling

const categories = [
  { id: 1, name: "Category A", subcategories: ["Subcategory 1A", "Subcategory 1B"] },
  { id: 2, name: "Category B", subcategories: ["Subcategory 2A", "Subcategory 2B"] },
  // ... more categories ...
];

const products = [
  { id: 1, name: "Product 1", category: "Category A", subCategory: "Subcategory 1A", description: "Description for Product 1", price: "₦10.99", type: "Wholesale" },
  { id: 2, name: "Product 2", category: "Category B", subCategory: "Subcategory 2A", description: "Description for Product 2", price: "₦19.99", type: "Retail" },
  // ... more product data ...
];

const ProductComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: categories[0].name, subCategory: categories[0]?.subcategories[0], description: "", price: "", type: "Wholesale" });
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDetailsModal = (product) => {
    setSelectedProduct(product);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedProduct(null);
    setOpenDetailsModal(false);
  };

  const handleEditClick = () => {
    if (editMode) {
      // Handle the update logic here based on your use case
      // For example, you can update the product details in your products array
      // and then set the updated products array in your state
    }
    setEditMode(!editMode);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Handle the image upload logic here based on your use case
    // You can upload the image to your server or process it as needed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      subCategory: '', // Reset subCategory when category changes
    }));
  };

  const handleAddProduct = () => {
    // Perform the actual product addition logic here
    // You can update the 'products' state with the new product
    // Reset the newProduct state and close the modal
    setNewProduct({ name: "", category: categories[0].name, subCategory: categories[0]?.subcategories[0], description: "", price: "", type: "Wholesale" });
    setOpenModal(false);
  };

  const renderSubcategories = () => {
    const selectedCategory = categories.find((category) => category.name === selectedProduct.category);

    if (!selectedCategory) return null;

    return selectedCategory.subcategories.map((subcategory) => (
      <MenuItem key={subcategory} value={subcategory}>
        {subcategory}
      </MenuItem>
    ));
  };


  return (
    <div className="product-container">
      <div className="filter-section">
        <Select
          value={newProduct.type}
          onChange={(event) => setNewProduct({ ...newProduct, type: event.target.value })}
        >
          <MenuItem value="Wholesale">Wholesale</MenuItem>
          <MenuItem value="Retail">Retail</MenuItem>
        </Select>
        <Select
          value={newProduct.category}
          onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={newProduct.subCategory}
          onChange={(event) => setNewProduct({ ...newProduct, subCategory: event.target.value })}
        >
          {categories
            .find((category) => category.name === newProduct.category)
            ?.subcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
        </Select>

      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {/* Replace 'image-url' with the actual URL of the product image */}
              <img src="image-url" alt={product.name} />
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {/* You can modify the styling for price and view more button */}
              <div className="product-price">{product.price}</div>
              <button className="view-more" onClick={() => handleOpenDetailsModal(product)}>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-button-container">
        <Button variant="outlined" onClick={handleOpenModal}>
          Add New Product
        </Button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>Add New Product</h2>
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="input-field"
            style={{ marginBottom: '16px' }}
          />
          <Select
            label="Type"
            name="type"
            value={newProduct.type}
            onChange={(event) => setNewProduct({ ...newProduct, type: event.target.value })}
            className="input-field"
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value="Wholesale">Wholesale</MenuItem>
            <MenuItem value="Retail">Retail</MenuItem>
          </Select>
          <Select
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
            className="input-field"
            style={{ marginBottom: '16px' }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Subcategory"
            name="subCategory"
            value={newProduct.subCategory}
            onChange={(event) => setNewProduct({ ...newProduct, subCategory: event.target.value })}
            className="input-field"
            style={{ marginBottom: '16px' }}
          >
            {categories
              .find((category) => category.name === newProduct.category)
              ?.subcategories.map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
          </Select>
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="input-field"
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="input-field"
            style={{ marginBottom: '16px' }}
          />

          <Button onClick={handleAddProduct} className="add-button">
            Add Product
          </Button>
        </div>
      </Modal>

      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <div className="details-modal-content">
          {selectedProduct && (
            <>
              <div className="image-container">
                {editMode ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                ) : (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="product-image"
                  />
                )}
              </div>
              <h2>
                {editMode ? (
                  <TextField label="Name" value={selectedProduct.name} />
                ) : (
                  selectedProduct.name
                )}
              </h2>
              <p>
                {editMode ? (
                  <TextField label="Description" value={selectedProduct.description} />
                ) : (
                  selectedProduct.description
                )}
              </p>
              <p>
                Category:{" "}
                {editMode ? (
                  <Select
                    label="Category"
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  selectedProduct.category
                )}
              </p>
              <p>
                Subcategory:{" "}
                {editMode ? (
                  <Select
                    label="Subcategory"
                    name="subCategory"
                    value={selectedProduct.subCategory}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {renderSubcategories()}
                  </Select>
                ) : (
                  selectedProduct.subCategory
                )}
              </p>

              <p>
                Price:{" "}
                {editMode ? (
                  <TextField
                    label="Price"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : (
                  selectedProduct.price
                )}
              </p>
              <p>
                Type:{" "}
                {editMode ? (
                  <Select
                    label="Type"
                    name="type"
                    value={selectedProduct.type}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <MenuItem value="Wholesale">Wholesale</MenuItem>
                    <MenuItem value="Retail">Retail</MenuItem>
                  </Select>
                ) : (
                  selectedProduct.type
                )}
              </p>
              <Button onClick={handleEditClick} className="edit-button">
                {editMode ? "Save" : "Edit"}
              </Button>
            </>
          )}
        </div>
      </Modal>

    </div>
  );
};

export default ProductComponent;
