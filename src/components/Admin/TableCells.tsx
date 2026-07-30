"use client";

import { ReactNode } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export interface StatusCellProps {
  status:
    | "Active"
    | "Inactive"
    | "Published"
    | "Draft"
    | "Scheduled"
    | "Out of Stock"
    | "Archived"; 
  showIcon?: boolean;
}

export function StatusCell({ status, showIcon = true }: StatusCellProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-green-100 dark:bg-green-900/20",
          text: "text-green-700 dark:text-green-400",
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
        };
      case "Inactive":
        return {
          bg: "bg-red-100 dark:bg-red-900/20",
          text: "text-red-700 dark:text-red-400",
          icon: <HighlightOffIcon sx={{ fontSize: 14 }} />,
        };
      case "Draft":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/20",
          text: "text-yellow-700 dark:text-yellow-400",
          icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} />,
        };
      case "Published":
        return {
          bg: "bg-green-100 dark:bg-green-900/20",
          text: "text-green-700 dark:text-green-400",
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
        };
      case "Scheduled":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/20",
          text: "text-blue-700 dark:text-blue-400",
          icon: <WatchLaterIcon sx={{ fontSize: 14 }} />,
        };
      case "Out of Stock":
        return {
          bg: "bg-red-100 dark:bg-red-900/20",
          text: "text-red-700 dark:text-red-400",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };
         case "Archived": 
        return {
          bg: "bg-gray-200 dark:bg-gray-800",
          text: "text-gray-700 dark:text-gray-400",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700",
          text: "text-gray-700 dark:text-gray-400",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {showIcon && config.icon}
      {status}
    </span>
  );
}

export function BadgeCell({
  text,
  color = "gray",
  showIcon = true,
}: {
  text: string;
  color?: "gray" | "blue" | "green" | "red" | "yellow" | "purple";
  showIcon?: boolean;
}) {
  const colorClasses = {
    gray: {
      bg: "bg-gray-100 dark:bg-gray-700",
      text: "text-gray-700 dark:text-gray-300",
      icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-400",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-400",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      icon: <HighlightOffIcon sx={{ fontSize: 14 }} />,
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      text: "text-yellow-700 dark:text-yellow-400",
      icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} />,
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/20",
      text: "text-purple-700 dark:text-purple-400",
      icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
    },
  };

  const config = colorClasses[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {showIcon && config.icon}
      {text}
    </span>
  );
}

export interface AvatarCellProps {
  name: string;
  email?: string;
  imageUrl?: string;
  initials?: string;
}

export function AvatarCell({
  name,
  email,
  imageUrl,
  initials,
}: AvatarCellProps) {
  const getInitials = (name: string) => {
    if (initials) return initials;
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-3">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
          {getInitials(name)}
        </div>
      )}
      <div>
        <p className="font-semibold text-gray-900 dark:text-white leading-tight">
          {name}
        </p>
        {email && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {email}
          </p>
        )}
      </div>
    </div>
  );
}

export interface ImageCellProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ImageCell({
  src,
  alt,
  className = "",
  size = "md",
}: ImageCellProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 ${sizeClasses[size]} ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

export function ActionsCell({
  onView,
  onEdit,
  onDelete,
  customActions,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: ReactNode;
}) {
  if (customActions)
    return <div className="flex items-center gap-1">{customActions}</div>;

  return (
    <div className="flex items-center gap-1">
      {onView && (
        <button
          onClick={onView}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
          title="View"
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 transition-all"
          title="Edit"
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30 transition-all"
          title="Delete"
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </button>
      )}
    </div>
  );
}