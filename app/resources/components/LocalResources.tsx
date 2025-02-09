"use client";

import { useState, useEffect } from "react";
import {
  categories as initialCategories,
  type Category,
  type Resource,
} from "../data/localResources";
import { CategoryList } from "./CategoryList";
import { ResourceList } from "./ResourceList";
import Link from "next/link";

export function LocalResources() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    // This effect will run when the component mounts and after each render
    // It will update the selected category if it exists in the updated categories
    if (selectedCategory) {
      const updatedCategory = categories.find(
        (c) => c.id === selectedCategory.id
      );
      if (updatedCategory) {
        setSelectedCategory(updatedCategory);
      }
    }
  }, [categories, selectedCategory]);

  const addResource = (newResource: Resource) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === newResource.type) {
          return {
            ...category,
            resources: [...category.resources, newResource],
          };
        }
        return category;
      });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Local Resources</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CategoryList
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="md:col-span-2">
          {selectedCategory ? (
            <ResourceList category={selectedCategory} />
          ) : (
            <p className="text-gray-400">Select a category to view resources</p>
          )}
        </div>
      </div>
    </div>
  );
}
