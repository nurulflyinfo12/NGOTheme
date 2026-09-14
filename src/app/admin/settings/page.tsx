"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Globe,
  Image as ImageIcon,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";

import ImageUpload from "@/components/Admin/ImageUpload";
import { useAppSettings, ApiAppSettings } from "@/hooks/useAppSettings";

// -------------------
// Shared Styles
// -------------------
const inputClass =
  "w-full rounded-xl text-black border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all outline-none focus:border-[#e86958] focus:ring-4 focus:ring-[#e86958]/5 placeholder:text-slate-300";
const labelClass =
  "text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block ml-1";

interface TabProps {
  settings: ApiAppSettings;
  setSettings: React.Dispatch<React.SetStateAction<ApiAppSettings>>;
}

// -------------------
// Tab Components
// -------------------

const GeneralTab: React.FC<TabProps> = ({ settings, setSettings }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    <div className="md:col-span-2">
      <label className={labelClass}>Application Name</label>
      <input
        className={inputClass}
        value={settings.ApplicationName}
        onChange={(e) =>
          setSettings({ ...settings, ApplicationName: e.target.value })
        }
      />
    </div>
    <div>
      <label className={labelClass}>Contact Email</label>
      <input
        type="email"
        className={inputClass}
        value={settings.ContactEmail}
        onChange={(e) =>
          setSettings({ ...settings, ContactEmail: e.target.value })
        }
      />
    </div>
    <div>
      <label className={labelClass}>Support Phone</label>
      <input
        className={inputClass}
        value={settings.SupportPhone}
        onChange={(e) =>
          setSettings({ ...settings, SupportPhone: e.target.value })
        }
      />
    </div>
    <div className="md:col-span-2">
      <label className={labelClass}>Site Description</label>
      <textarea
        className={inputClass}
        rows={4}
        value={settings.Description}
        onChange={(e) =>
          setSettings({ ...settings, Description: e.target.value })
        }
      />
    </div>
  </motion.div>
);

const AppearanceTab: React.FC<TabProps> = ({ settings, setSettings }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {[
      { label: "Logo (Light)", key: "Logo" },
      { label: "Logo (Dark)", key: "LogoDark" },
      { label: "Favicon (Light)", key: "LogoSmall" },
      { label: "Favicon (Dark)", key: "LogoSmallDark" },
    ].map((item) => (
      <div
        key={item.key}
        className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4"
      >
        <label className={labelClass}>{item.label}</label>
        <ImageUpload
          allowedTypes="image"
          allowMultiple={false}
          showCaption={false}
          initialImages={
            settings[item.key as keyof ApiAppSettings]
              ? [
                  {
                    image: settings[
                      item.key as keyof ApiAppSettings
                    ] as string,
                  },
                ]
              : []
          }
          onImagesChange={(files) =>
            setSettings((prev) => ({
              ...prev,
              [item.key]: files[0]?.image || "",
            }))
          }
        />
      </div>
    ))}
  </motion.div>
);

const SeoTab: React.FC<TabProps> = ({ settings, setSettings }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div>
      <label className={labelClass}>OG Title (Social Heading)</label>
      <input
        className={inputClass}
        value={settings.OGTitle}
        onChange={(e) => setSettings({ ...settings, OGTitle: e.target.value })}
      />
    </div>
    <div>
      <label className={labelClass}>SEO Keywords</label>
      <input
        className={inputClass}
        placeholder="e.g. engineering, automation"
        value={settings.SeoKeywords}
        onChange={(e) =>
          setSettings({ ...settings, SeoKeywords: e.target.value })
        }
      />
    </div>
    <div>
      <label className={labelClass}>OG Description</label>
      <textarea
        className={inputClass}
        rows={3}
        value={settings.OGDescription}
        onChange={(e) =>
          setSettings({ ...settings, OGDescription: e.target.value })
        }
      />
    </div>
  </motion.div>
);

const SocialTab: React.FC<TabProps> = ({ settings, setSettings }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {["Facebook", "Instagram", "Twitter", "Linkedin", "Youtube"].map(
      (platform) => {
        const propKey = `${platform}Url` as keyof ApiAppSettings;
        return (
          <div key={platform}>
            <label className={labelClass}>{platform} URL</label>
            <div className="relative">
              <LinkIcon
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              />
              <input
                className={`${inputClass} pl-10`}
                placeholder={`https://${platform.toLowerCase()}.com/`}
                value={(settings[propKey] as string) || ""}
                onChange={(e) =>
                  setSettings({ ...settings, [propKey]: e.target.value })
                }
              />
            </div>
          </div>
        );
      }
    )}
  </motion.div>
);

// -------------------
// Main SettingsPage
// -------------------
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "appearance" | "seo" | "social"
  >("general");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    settings,
    setSettings,
    submitting,
    fetchSettings,
    updateSettings,
  } = useAppSettings();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const payload: ApiAppSettings = {
      AppConfigID: settings.AppConfigID || "0",
      ApplicationName: settings.ApplicationName,
      Logo: settings.Logo || "",
      LogoDark: settings.LogoDark || "",
      LogoSmall: settings.LogoSmall || "",
      LogoSmallDark: settings.LogoSmallDark || "",
      Description: settings.Description || "",
      ContactEmail: settings.ContactEmail || "",
      SupportPhone: settings.SupportPhone || "",
      Version: settings.Version || "1.0.0",
      IsActive: settings.IsActive ?? true,
      FalseCount: settings.FalseCount || 0,
      CompanyID: currentUser?.CompanyID || settings.CompanyID || "0",
      OGTitle: settings.OGTitle || "",
      OGDescription: settings.OGDescription || "",
      OGImageUrl: settings.OGImageUrl || "",
      OGKeywords: settings.OGKeywords || "",
      SeoKeywords: settings.SeoKeywords || "",
      FacebookUrl: settings.FacebookUrl || "",
      InstagramUrl: settings.InstagramUrl || "",
      TwitterUrl: settings.TwitterUrl || "",
      YoutubeUrl: settings.YoutubeUrl || "",
      LinkedinUrl: settings.LinkedinUrl || "",
      Advertisement: settings.Advertisement || [],
    };

    const success = await updateSettings(payload);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "appearance", label: "Appearance", icon: ImageIcon },
    { id: "seo", label: "Search Engine", icon: ShieldCheck },
    { id: "social", label: "Social Media", icon: Share2 },
  ];

  return (
    <div className="space-y-8 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Settings<span className="text-[#e86958]">.</span>
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">
            Global Configuration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-emerald-100"
              >
                <CheckCircle2 size={14} /> Saved Successfully
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={handleSave}
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl !bg-[#e86958] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all !hover:bg-slate-800 active:scale-95 disabled:opacity-70"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Nav Sidebar */}
        <nav className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const IsActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-1 lg:flex-none items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all whitespace-nowrap ${
                  IsActive
                    ? "bg-[#e86958]/10 text-[#e86958] ring-1 ring-[#e86958]/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <tab.icon
                  size={18}
                  className={IsActive ? "text-[#e86958]" : "text-slate-400"}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Form Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSave}>
            {activeTab === "general" && (
              <GeneralTab settings={settings} setSettings={setSettings} />
            )}
            {activeTab === "appearance" && (
              <AppearanceTab settings={settings} setSettings={setSettings} />
            )}
            {activeTab === "seo" && (
              <SeoTab settings={settings} setSettings={setSettings} />
            )}
            {activeTab === "social" && (
              <SocialTab settings={settings} setSettings={setSettings} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}