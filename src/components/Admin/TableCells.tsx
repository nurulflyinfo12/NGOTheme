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

const PRIMARY = "#f86048";

/* ============================================================
   StatusCell
   ============================================================ */
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
      case "Published":
        return {
          bg: "bg-green-100 dark:bg-green-500/15!",
          text: "text-green-700! dark:text-green-400!",
          ring: "ring-green-500/10! dark:ring-green-500/20!",
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
        };

      case "Inactive":
        return {
          bg: "bg-red-100 dark:bg-red-500/15!",
          text: "text-red-700! dark:text-red-400!",
          ring: "ring-red-500/10! dark:ring-red-500/20!",
          icon: <HighlightOffIcon sx={{ fontSize: 14 }} />,
        };

      case "Draft":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-500/15!",
          text: "text-yellow-700! dark:text-yellow-400!",
          ring: "ring-yellow-500/10! dark:ring-yellow-500/20!",
          icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} />,
        };

      case "Scheduled":
        return {
          bg: "bg-blue-100 dark:bg-blue-500/15!",
          text: "text-blue-700! dark:text-blue-400!",
          ring: "ring-blue-500/10! dark:ring-blue-500/20!",
          icon: <WatchLaterIcon sx={{ fontSize: 14 }} />,
        };

      case "Out of Stock":
        return {
          bg: "bg-red-100 dark:bg-red-500/15!",
          text: "text-red-700! dark:text-red-400!",
          ring: "ring-red-500/10! dark:ring-red-500/20!",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };

      case "Archived":
        return {
          bg: "bg-gray-200 dark:bg-gray-500/15!",
          text: "text-gray-700! dark:text-gray-400!",
          ring: "ring-gray-500/10! dark:ring-gray-500/20!",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };

      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-500/15!",
          text: "text-gray-700! dark:text-gray-400!",
          ring: "ring-gray-500/10! dark:ring-gray-500/20!",
          icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`
        inline-flex items-center gap-1.5!
        rounded-full! px-3! py-1!
        text-xs! font-medium!
        ring-1!
        ${config.bg} ${config.text} ${config.ring}
      `}
    >
      {showIcon && config.icon}
      {status}
    </span>
  );
}

/* ============================================================
   BadgeCell
   ============================================================ */
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
      bg: "bg-gray-100 dark:bg-gray-500/15!",
      text: "text-gray-700! dark:text-gray-300!",
      ring: "ring-gray-500/10! dark:ring-gray-500/20!",
      icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-500/15!",
      text: "text-blue-700! dark:text-blue-400!",
      ring: "ring-blue-500/10! dark:ring-blue-500/20!",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
    },
    green: {
      bg: "bg-green-100 dark:bg-green-500/15!",
      text: "text-green-700! dark:text-green-400!",
      ring: "ring-green-500/10! dark:ring-green-500/20!",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />,
    },
    red: {
      bg: "bg-red-100 dark:bg-red-500/15!",
      text: "text-red-700! dark:text-red-400!",
      ring: "ring-red-500/10! dark:ring-red-500/20!",
      icon: <HighlightOffIcon sx={{ fontSize: 14 }} />,
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-500/15!",
      text: "text-yellow-700! dark:text-yellow-400!",
      ring: "ring-yellow-500/10! dark:ring-yellow-500/20!",
      icon: <ErrorOutlineIcon sx={{ fontSize: 14 }} />,
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-500/15!",
      text: "text-purple-700! dark:text-purple-400!",
      ring: "ring-purple-500/10! dark:ring-purple-500/20!",
      icon: <InfoOutlinedIcon sx={{ fontSize: 14 }} />,
    },
  };

  const config = colorClasses[color];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5!
        rounded-full! px-3! py-1!
        text-xs! font-medium!
        ring-1!
        ${config.bg} ${config.text} ${config.ring}
      `}
    >
      {showIcon && config.icon}
      {text}
    </span>
  );
}

/* ============================================================
   AvatarCell
   ============================================================ */
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
  const getInitials = (n: string) => {
    if (initials) return initials;
    return n
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-3!">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-10! w-10! rounded-full! object-cover border border-gray-200 dark:border-gray-700!"
        />
      ) : (
        <div
          className="
            flex h-10! w-10! items-center justify-center
            rounded-full!
            text-sm! font-bold!
            shrink-0
          "
          style={{
            backgroundColor: `${PRIMARY}15`,
            color: PRIMARY,
          }}
        >
          {getInitials(name)}
        </div>
      )}

      <div className="min-w-0">
        <p className="font-semibold! text-gray-900! dark:text-white! leading-tight! truncate!">
          {name}
        </p>
        {email && (
          <p className="text-xs! text-gray-500! dark:text-gray-400! mt-0.5! truncate!">
            {email}
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ImageCell
   ============================================================ */
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
    sm: "h-8! w-8!",
    md: "h-10! w-10!",
    lg: "h-14! w-14!",
  };

  return (
    <div
      className={`
        overflow-hidden rounded-lg!
        border border-gray-100 dark:border-gray-800!
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

/* ============================================================
   ActionsCell
   ============================================================ */
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
  if (customActions) {
    return <div className="flex items-center gap-1!">{customActions}</div>;
  }

  return (
    <div className="flex items-center gap-1!">
      {onView && (
        <button
          type="button"
          onClick={onView}
          className="
            rounded-lg! p-2!
            text-gray-500! dark:text-gray-400!
            hover:bg-gray-100! dark:hover:bg-gray-700/60!
            hover:text-gray-700! dark:hover:text-white!
            transition-all
          "
          title="View"
          aria-label="View"
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </button>
      )}

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="
            rounded-lg! p-2!
            text-blue-500! dark:text-blue-400!
            hover:bg-blue-50! dark:hover:bg-blue-500/15!
            hover:text-blue-700! dark:hover:text-blue-300!
            transition-all
          "
          title="Edit"
          aria-label="Edit"
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="
            rounded-lg! p-2!
            text-red-500! dark:text-red-400!
            hover:bg-red-50! dark:hover:bg-red-500/15!
            hover:text-red-700! dark:hover:text-red-300!
            transition-all
          "
          title="Delete"
          aria-label="Delete"
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </button>
      )}
    </div>
  );
}