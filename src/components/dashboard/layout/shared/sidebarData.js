const sidebarData = [
  {
    path: "",
    icon: require("../../../../assets/images/Dashboard.svg").default,
    alt: "dash-board-icon",
    label: "Dashboard",
  },
  {
    path: "fleet",
    icon: require("../../../../assets/images/manage-listing.svg").default,
    alt: "Manage-Listings-icon",
    label: "Manage Listings",
    submenu: [
      {
        path: "fleet",
        label: "Fleet",
      },
      {
        path: "addons",
        label: "Addons",
      },
      {
        path: "activities",
        label: "Activities",
      },
      {
        path: "trip-packages",
        label: "Trip Packages",
      },
      {
        path: "booking",
        label: "Booking",
      },
      {
        path: "destination",
        label: "Destination",
      },
      {
        path: "packages",
        label: "Packages",
      },
    ],
  },
  {
    path: "agent-request",
    icon: require("../../../../assets/images/markiting-promotion.svg").default,
    alt: "Marketing-Promotion-icon",
    label: "Markiting & Promotions",
    submenu: [
      {
        path: "agent-request",
        label: "Agent Requests",
      },
      {
        path: "affiliate",
        label: "Affiliate",
      },
      {
        path: "compignes",
        label: "Compignes",
      }
    ],
  },
  {
    path: "reports",
    icon: require("../../../../assets/images/Reports.svg").default,
    alt: "analytics-icon",
    label: "Analytics",
    submenu: [{
      path: "reports",
      label: "Reports",
    }, {
      path: "clients",
      label: "Clients",
    }]
  },
  
  {
    path: "guests",
    icon: require("../../../../assets/images/guest-details.svg").default,
    alt: "packages-icon",
    label: "Guest Details &  Reviews",
    submenu: [
      {
        path: "guests",
        label: "Guests",
      },
      {
        path: "complaint",
        label: "Complaint",
      },
      {
        path: "rating",
        label: "Rating",
      },
      {
        path: "questions-settings",
        label: "Questions",
      },
    ]
  },
];

export default sidebarData;
