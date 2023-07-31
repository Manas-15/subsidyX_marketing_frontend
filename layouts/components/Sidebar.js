import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userActions } from "redux/Actions/userAction";
import Image from "next/image";
// import { sidebarActions } from "../../redux/Actions/sidebarAction";

const sideBarItems = [
  {
    name: "Report Management",
    href: "/report/all-report-list",
    icon: "/images/report (1).png",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          <Link
            href="/login"
            className="navbar-brand"
            onClick={() => dispatch(userActions.logout())}
          >
            <Image src="/images/logo.png" height="50" width="50" alt="logo" />
            <Image
              src="/images/logo-text.png"
              height="35"
              width="133"
              alt="logo name"
              className="sidebar_logo_name"
            />
            {/* <figure>
              <img className="logo" src="/images/logo.png" alt="" />
              <img
                src="/images/logo-text.png"
                alt=""
                className="sidebar_logo_name"
              />
            </figure> */}
          </Link>
        </div>
        <ul className="sidebar_list">
          {sideBarItems?.map(({ name, href, icon: Icon }, index) => {
            return (
              <li className="sidebar_item" key={index}>
                <Link className="sidebar_link" href={href}>
                  <span className="sidebar_icon">
                    <Image src={Icon} alt="My Image" width={20} height={20} />
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
