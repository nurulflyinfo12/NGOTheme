"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Save,
  Plus,
  Building,
  MapPin,
  Phone as PhoneIcon,
  Mail,
  Navigation,
  Globe,
} from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import { TextField } from "@/components/Admin/TextField";
import { useBranch, ApiBranch } from "@/hooks/useBranch";

export interface BranchFormData {
  branchId?: string;
  companyId?: string;
  branchName: string;
  village: string;
  postOffice: string;
  union: string;
  thana: string;
  upazilla: string;
  district: string;
  phone: string;
  email: string;
  lat: string;
  long: string;
  isActive: boolean;
}

function AddEditBranchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchBranchById, saveOrUpdateBranch } = useBranch();

  const [formData, setFormData] = useState<BranchFormData>({
    branchName: "",
    village: "",
    postOffice: "",
    union: "",
    thana: "",
    upazilla: "",
    district: "",
    phone: "",
    email: "",
    lat: "",
    long: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BranchFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempBranchData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            branchId: item.BranchID || idParam,
            companyId: item.CompanyID || "",
            branchName: item.BranchName || item.branchName || "",
            village: item.Village || item.village || "",
            postOffice: item.PostOffice || item.postOffice || "",
            union: item.Union || item.union || "",
            thana: item.Thana || item.thana || "",
            upazilla: item.Upazilla || item.upazilla || "",
            district: item.District || item.district || "",
            phone: item.Phone || item.phone || "",
            email: item.Email || item.email || "",
            lat: item.Lat || item.lat || "",
            long: item.Long || item.long || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing branch data:", e);
        }
      } else {
        fetchBranchById(idParam).then((item) => {
          if (item) {
            setFormData({
              branchId: item.BranchID || idParam,
              companyId: item.CompanyID || "",
              branchName: item.BranchName || "",
              village: item.Village || "",
              postOffice: item.PostOffice || "",
              union: item.Union || "",
              thana: item.Thana || "",
              upazilla: item.Upazilla || "",
              district: item.District || "",
              phone: item.Phone || "",
              email: item.Email || "",
              lat: item.Lat || "",
              long: item.Long || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, idParam, fetchBranchById]);

  const handleClear = () => {
    setFormData({
      branchId: isEditMode ? formData.branchId : undefined,
      companyId: formData.companyId,
      branchName: "",
      village: "",
      postOffice: "",
      union: "",
      thana: "",
      upazilla: "",
      district: "",
      phone: "",
      email: "",
      lat: "",
      long: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof BranchFormData, string>> = {};
    if (!formData.branchName.trim())
      newErrors.branchName = "Branch name is Required.";
    if (!formData.district.trim()) newErrors.district = "District is Required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is Required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof BranchFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const branchIdValue = formData.branchId || idParam || "0";
    const companyIdValue = currentUser?.CompanyID || formData.companyId || "0";

    const payload: ApiBranch = {
      BranchID: branchIdValue,
      CompanyID: companyIdValue,
      BranchName: formData.branchName,
      Village: formData.village,
      PostOffice: formData.postOffice,
      Union: formData.union,
      Thana: formData.thana,
      Upazilla: formData.upazilla,
      District: formData.district,
      Phone: formData.phone,
      Email: formData.email,
      Lat: formData.lat,
      Long: formData.long,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateBranch(payload);

    if (success) {
      localStorage.removeItem("tempBranchData");
      router.push("/admin/branch");
    }
  };

  return (
    <FormCard
      title={isEditMode ? "Edit Branch" : "Add Branch"}
      description="Branch address and contact info"
      onBack={() => {
        localStorage.removeItem("tempBranchData");
        router.push("/admin/branch");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear}
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Create Branch"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <TextField
        label="Branch Name*"
        icon={Building}
        placeholder="e.g. Dhaka Central"
        value={formData.branchName}
        onChange={(e) => handleChange("branchName", e.target.value)}
        error={errors.branchName}
      />

      <TextField
        label="District*"
        icon={MapPin}
        placeholder="e.g. Dhaka"
        value={formData.district}
        onChange={(e) => handleChange("district", e.target.value)}
        error={errors.district}
      />

      <TextField
        label="Upazilla"
        icon={MapPin}
        placeholder="e.g. Uttara"
        value={formData.upazilla}
        onChange={(e) => handleChange("upazilla", e.target.value)}
        error={errors.upazilla}
      />

      <TextField
        label="Thana"
        icon={MapPin}
        placeholder="e.g. Uttara"
        value={formData.thana}
        onChange={(e) => handleChange("thana", e.target.value)}
        error={errors.thana}
      />

      <TextField
        label="Union"
        icon={MapPin}
        placeholder="e.g. Uttara"
        value={formData.union}
        onChange={(e) => handleChange("union", e.target.value)}
        error={errors.union}
      />

      <TextField
        label="Post Office"
        icon={MapPin}
        placeholder="e.g. Uttara"
        value={formData.postOffice}
        onChange={(e) => handleChange("postOffice", e.target.value)}
        error={errors.postOffice}
      />

      <TextField
        label="Village / Sector"
        icon={MapPin}
        placeholder="e.g. Sector 3"
        value={formData.village}
        onChange={(e) => handleChange("village", e.target.value)}
        error={errors.village}
      />
      {/* 
      <TextField
        label="Phone*"
        icon={PhoneIcon}
        placeholder="e.g. +8801700000000"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
      /> */}

      <TextField
        label="Email"
        icon={Mail}
        type="email"
        placeholder="dhaka@branch.org"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
      />

      <TextField
        label="Latitude"
        icon={Navigation}
        placeholder="e.g. 23.8759"
        value={formData.lat}
        onChange={(e) => handleChange("lat", e.target.value)}
        error={errors.lat}
      />

      <TextField
        label="Longitude"
        icon={Globe}
        placeholder="e.g. 90.3795"
        value={formData.long}
        onChange={(e) => handleChange("long", e.target.value)}
        error={errors.long}
      />
    </FormCard>
  );
}

export default function AddEditBranchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">
          Loading branch form...
        </div>
      }
    >
      <AddEditBranchContent />
    </Suspense>
  );
}
