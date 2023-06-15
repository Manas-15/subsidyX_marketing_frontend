import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { sidebarActions } from "../../redux/Actions/sidebarAction";

const sideBarItems = [
  {
    name: "Report management",
    href: "/report/all-report-list",
    icon: TbReportAnalytics,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const pathName = router?.pathname
      .toLowerCase()
      .replace(/[^\w-]+/g, "")
      .replace("_", " ")
      .split(" ");
    const item = pathName
      .map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join(" ");

    // dispatch(sidebarActions.selectedCategory(item));
  }, [router?.pathname]);

  return (
    <div className="sidebar_wrapper">
      <button className="sidebar_btn" onClick={toogleSidebar}>
        {isCollapsed ? (
          <MdOutlineKeyboardArrowRight className="fs-4 text-light" />
        ) : (
          <MdOutlineKeyboardArrowLeft className="fs-4 text-light" />
        )}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar_top">
          <a href="#" className="navbar-brand">
            <figure>
              <img className="logo" src="/images/logo.png" alt="" />
              <img
                src="/images/logo-text.png"
                alt=""
                className="sidebar_logo_name"
              />
            </figure>
          </a>
        </div>
        <ul className="sidebar_list">
          {sideBarItems?.map(({ name, href, icon: Icon }, index) => {
            return (
              <li className="sidebar_item" key={index}>
                <Link className="sidebar_link" href={href}>
                  <span className="sidebar_icon">
                    <Icon size="30px" color="#fa6130" />
                  </span>
                  <span className="sidebar_name ">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
