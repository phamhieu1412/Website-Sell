import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions as productsActions } from "../redux/productsRedux";

const FilterByParams = (props) => {
  const { listFilter } = props;
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.productsReducer);
  const { manufacturers, specifications } = listFilter;
  const { meta } = productsReducer;
  const { manufacturer_ids } = meta;

  const selectManufacture = (id) => {
    dispatch(
      productsActions.getProductsByFilters({
        page: meta.page,
        page_size: meta.pageSize,
        category_ids: meta.category_ids,
        manufacturer_ids: [id],
      })
    );
  };
  const selectSpecification = (id) => {
    dispatch(
      productsActions.getProductsByFilters({
        page: meta.page,
        page_size: meta.pageSize,
        category_ids: meta.category_ids,
        specifications: [id],
        manufacturer_ids: meta.manufacturer_ids,
      })
    );
  };

  return (
    <div className="col-2 filter-col" id="filter-col">
      <div className="box filter-toggle-box">
        <button className="btn-flat btn-hover" id="filter-close">
          close
        </button>
      </div>
      <div className="box">
        <span className="filter-header">Nhà sản xuất</span>
        <ul className="filter-list">
          {manufacturers &&
            manufacturers.map((item) => (
              <li key={item.id}>
                <div
                  className={
                    manufacturer_ids.length > 0 &&
                    manufacturer_ids[0] == item.id
                      ? "id-active-sidebar select-item-filter"
                      : "select-item-filter"
                  }
                  onClick={() => selectManufacture(item.id)}
                >
                  {item.name}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterByParams;
