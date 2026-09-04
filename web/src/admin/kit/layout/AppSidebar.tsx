'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@/admin/kit/next-nav";

// Assume these icons are imported from an icon library
import {
  AlertIcon,
  BoltIcon,
  BoxCubeIcon,
  CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  FileIcon,
  GridIcon,
  GroupIcon,
  HorizontaLDots,
  ListIcon,
  MapsIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  ShootingStarIcon,
  TableIcon,
  UserCircleIcon,
  UserIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import BrandLogo from "../components/common/BrandLogo";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";
import type { MessageKey } from "../i18n/translations";

type MenuType = "yurist" | "main" | "support" | "others";

type NavSubItem = {
  name: MessageKey;
  path: string;
  pro?: boolean;
  new?: boolean;
  live?: boolean;
};

type NavItem = {
  name: MessageKey;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  live?: boolean;
  subItems?: NavSubItem[];
};

const dimClass = "opacity-45 saturate-50 pointer-events-none";

function itemIsLive(nav: NavItem) {
  return nav.live === true;
}

/** Live Fond modules — same TailAdmin sidebar slot as Yurist section */
const yuristItems: NavItem[] = [
  { icon: <BoltIcon />, name: "nav.aiQuestions", path: "/admin/contacts", live: true },
  { icon: <UserIcon />, name: "nav.users", path: "/admin/donations", live: true },
  { icon: <GroupIcon />, name: "nav.specialists", path: "/admin/grants", live: true },
  { icon: <CalenderIcon />, name: "nav.templates", path: "/admin/events", live: true },
  { icon: <DocsIcon />, name: "nav.notices", path: "/admin/news", live: true },
  { icon: <AlertIcon />, name: "nav.announcements", path: "/admin/announcements", live: true },
  { icon: <ShootingStarIcon />, name: "nav.ratings", path: "/admin/shop/products", live: true },
  { icon: <BoxCubeIcon />, name: "nav.sales", path: "/admin/shop/orders", live: true },
  { icon: <FileIcon />, name: "nav.fileManager", path: "/admin/documents", live: true },
  { icon: <PageIcon />, name: "nav.apiKeys", path: "/admin/media", live: true },
  { icon: <UserCircleIcon />, name: "nav.ai", path: "/admin/alumni", live: true },
  { icon: <ListIcon />, name: "nav.integrations", path: "/admin/staff", live: true },
];

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "nav.dashboard",
    live: true,
    subItems: [
      { name: "nav.ecommerce", path: "/admin", pro: false, live: true },
      { name: "nav.finance", path: "/admin/finance", pro: false, live: true },
      { name: "nav.analytics", path: "/admin/subscribers", pro: false, live: true },
      { name: "nav.marketing", path: "/admin/content", pro: false, live: true },
      { name: "nav.crm", path: "/admin/board", pro: false, live: true },
      { name: "nav.stocks", path: "/admin/settings", pro: false },
      { name: "nav.saas", path: "/admin/account", pro: false },
    ],
  },
  { icon: <CalenderIcon />, name: "nav.calendar", path: "/admin/events", live: true },
  { icon: <UserCircleIcon />, name: "nav.profile", path: "/admin/account", live: true },
  {
    name: "nav.forms",
    icon: <ListIcon />,
    subItems: [
      { name: "nav.formElements", path: "/admin/settings", pro: false },
      { name: "nav.formLayout", path: "/admin/content", pro: false },
    ],
  },
  {
    name: "nav.tables",
    icon: <TableIcon />,
    subItems: [
      { name: "nav.basicTables", path: "/admin/news", pro: false },
      { name: "nav.dataTables", path: "/admin/board", pro: false },
    ],
  },
  {
    name: "nav.pages",
    icon: <PageIcon />,
    live: true,
    subItems: [
      { name: "nav.fileManager", path: "/admin/documents", pro: false, live: true },
      { name: "nav.apiKeys", path: "/admin/media", live: true },
      { name: "nav.integrations", path: "/admin/staff", new: true, live: true },
      { name: "nav.blank", path: "/admin/settings", pro: false },
      { name: "nav.error404", path: "/uz", pro: false },
    ],
  },
];

const supportItems: NavItem[] = [
  { icon: <ChatIcon />, name: "nav.chat", path: "/admin/contacts", live: true },
  {
    icon: <DocsIcon />,
    name: "nav.tickets",
    new: true,
    live: true,
    subItems: [
      { name: "nav.ticketList", path: "/admin/contacts", pro: false, live: true },
      { name: "nav.ticketReply", path: "/admin/donations", pro: false, live: true },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "nav.charts",
    subItems: [
      { name: "nav.lineChart", path: "/admin/finance", pro: false },
      { name: "nav.barChart", path: "/admin/finance", pro: false },
    ],
  },
  {
    icon: <MapsIcon />,
    name: "nav.maps",
    new: true,
    live: true,
    subItems: [
      { name: "nav.map", path: "/admin/alumni", pro: false, live: true },
      { name: "nav.vectorMap", path: "/admin/alumni", pro: false, live: true },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "nav.ui",
    subItems: [
      { name: "nav.alerts", path: "/admin/settings", pro: false },
      { name: "nav.avatar", path: "/admin/account", pro: false },
      { name: "nav.badge", path: "/admin/settings", pro: false },
      { name: "nav.buttons", path: "/admin/settings", pro: false },
      { name: "nav.images", path: "/admin/media", pro: false },
      { name: "nav.videos", path: "/admin/media", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "nav.auth",
    subItems: [
      { name: "nav.signIn", path: "/admin/login", pro: false, live: true },
      { name: "nav.signUp", path: "/admin/login", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const { t } = useI18n();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: MenuType;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    (["yurist", "main", "support", "others"] as MenuType[]).forEach((menuType) => {
      const items =
        menuType === "yurist"
          ? yuristItems
          : menuType === "main"
          ? navItems
          : menuType === "support"
          ? supportItems
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: MenuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: MenuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              } ${itemIsLive(nav) ? "" : dimClass}`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{t(nav.name)}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && nav.new && (
                <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                  new
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } ${itemIsLive(nav) ? "" : dimClass}`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{t(nav.name)}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      } ${subItem.live === true ? "" : dimClass}`}
                    >
                      {t(subItem.name)}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/admin" className="flex items-center" aria-label="TDYU">
          {isExpanded || isHovered || isMobileOpen ? (
            <BrandLogo variant="full" />
          ) : (
            <BrandLogo variant="mark" />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("nav.menu")
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("nav.yurist")
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(yuristItems, "yurist")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("nav.support")
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("nav.others")
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
