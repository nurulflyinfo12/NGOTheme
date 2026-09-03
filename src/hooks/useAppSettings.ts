"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiAdvertisement {
  AdvertisementID?: string;
  CompanyID?: string;
  Title?: string;
  Description?: string;
  BannerImage?: string;
  BannerImageMobile?: string;
  RedirectUrl?: string;
  PositionID?: string;
  PositionName?: string;
  StartDate?: string;
  EndDate?: string;
  IsActive?: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;
  UserID?: string;
}

export interface ApiAppSettings {
  AppConfigID?: string;
  ApplicationName: string;
  Logo?: string;
  LogoDark?: string;
  LogoSmall?: string;
  LogoSmallDark?: string;
  Description?: string;
  ContactEmail?: string;
  SupportPhone?: string;
  Version?: string;
  IsActive: boolean;
  FalseCount?: number;
  CompanyID?: string;
  OGTitle?: string;
  OGDescription?: string;
  OGImageUrl?: string;
  OGKeywords?: string;
  SeoKeywords?: string;
  FacebookUrl?: string;
  InstagramUrl?: string;
  TwitterUrl?: string;
  YoutubeUrl?: string;
  LinkedinUrl?: string;
  Advertisement?: ApiAdvertisement[];
}

export function useAppSettings() {
  const [settings, setSettings] = useState<ApiAppSettings>({
    AppConfigID: "0",
    ApplicationName: "",
    Logo: "",
    LogoDark: "",
    LogoSmall: "",
    LogoSmallDark: "",
    Description: "",
    ContactEmail: "",
    SupportPhone: "",
    Version: "1.0.0",
    IsActive: true,
    FalseCount: 0,
    CompanyID: "0",
    OGTitle: "",
    OGDescription: "",
    OGImageUrl: "",
    OGKeywords: "",
    SeoKeywords: "",
    FacebookUrl: "",
    InstagramUrl: "",
    TwitterUrl: "",
    YoutubeUrl: "",
    LinkedinUrl: "",
    Advertisement: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch Application Details: GET /api/Common/GetApplicationDetails
  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiAppSettings | ApiAppSettings[]>(
        "/Common/GetApplicationDetails"
      );
      const res = Array.isArray(data) ? data[0] : data;
      if (res) {
        setSettings({
          AppConfigID: res.AppConfigID || "0",
          ApplicationName: res.ApplicationName || "",
          Logo: res.Logo || "",
          LogoDark: res.LogoDark || "",
          LogoSmall: res.LogoSmall || "",
          LogoSmallDark: res.LogoSmallDark || "",
          Description: res.Description || "",
          ContactEmail: res.ContactEmail || "",
          SupportPhone: res.SupportPhone || "",
          Version: res.Version || "1.0.0",
          IsActive: res.IsActive ?? true,
          FalseCount: res.FalseCount || 0,
          CompanyID: res.CompanyID || "0",
          OGTitle: res.OGTitle || "",
          OGDescription: res.OGDescription || "",
          OGImageUrl: res.OGImageUrl || "",
          OGKeywords: res.OGKeywords || "",
          SeoKeywords: res.SeoKeywords || "",
          FacebookUrl: res.FacebookUrl || "",
          InstagramUrl: res.InstagramUrl || "",
          TwitterUrl: res.TwitterUrl || "",
          YoutubeUrl: res.YoutubeUrl || "",
          LinkedinUrl: res.LinkedinUrl || "",
          Advertisement: res.Advertisement || [],
        });
        return res;
      }
      return null;
    } catch (err: any) {
      const msg = err.message || "Failed to load application settings.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Modify Application Details: POST /api/Common/Modify-ApplicationDetails
  const updateSettings = async (payload: ApiAppSettings) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Common/Modify-ApplicationDetails", payload);

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Application settings updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save application settings.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    settings,
    setSettings,
    loading,
    submitting,
    error,
    fetchSettings,
    updateSettings,
  };
}