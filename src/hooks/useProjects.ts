"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiProject {
  ProjectID?: string;
  CompanyID?: string;
  Title: string;
  Subtitle?: string;
  Photo: string;
  CategoryID: string;
  CategoryName?: string;
  Details: string;
  Location?: string;
  Time?: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Projects: GET /api/Project/GetAllProject
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiProject[]>("/Project/GetAllProject");
      const list = Array.isArray(data) ? data : [];
      setProjects(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load projects.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Single Project by ID: GET /api/Project/GetProjectById?projectId={id}
  const fetchProjectById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiProject | ApiProject[]>(
        `/Project/GetProjectById?projectId=${encodeURIComponent(id)}`,
      );
      const item = Array.isArray(res) ? res[0] : res;
      return item || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch project details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Project: POST /api/Project/SaveUpdateProject
  // Save or Update Project: POST /api/Project/SaveUpdateProject
  const saveOrUpdateProject = async (payload: ApiProject) => {
    setSubmitting(true);
    setError("");
    try {
      const res: any = await api.post("/Project/SaveUpdateProject", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      // Check if the backend returned an explicit error response structure
      const isErrorType = res?.MessageType === 3;
      const errorMessage = res?.CurrentMessage || res?.message;

      if (isErrorType || (res?.MessageType && res.MessageType !== 1)) {
        const msg =
          errorMessage || "Failed to save project due to a server error.";
        setError(msg);
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: msg,
          confirmButtonColor: "#e86958",
        });
        return false;
      }

      // Success response handling
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: res?.CurrentMessage || "Project saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.CurrentMessage ||
        err?.message ||
        "Failed to save project.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: msg,
        confirmButtonColor: "#e86958",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Project: POST /api/Project/DeleteProject?projectId={id}
  const deleteProject = async (project: ApiProject) => {
    const projectId = project.ProjectID || "";

    if (!projectId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Project ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete project "${project.Title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Project/DeleteProject?projectId=${encodeURIComponent(projectId)}`,
          {},
        );
        Swal.fire({
          title: "Deleted!",
          text: "Project has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchProjects();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete project.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    projects,
    loading,
    submitting,
    error,
    fetchProjects,
    fetchProjectById,
    saveOrUpdateProject,
    deleteProject,
  };
}
