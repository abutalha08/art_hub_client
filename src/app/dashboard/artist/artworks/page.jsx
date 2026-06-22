"use client";

import React, { useEffect, useState } from "react";
import { Card, Chip, Spinner, Button, Tooltip } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
// import { myArtworks } from "@/lib/api/artworks/data";

import { FiEdit3 } from "react-icons/fi";
// import DeleteArtworkModal from "@/components/DeleteArtworkModal";
// import EditArtworkModal from "@/components/EditArtworkModal";
import { getArtistArtworks } from "@/lib/api/artworks";

export default function ManageArtworkTable() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditClick = (artwork) => {
    setEditingEvent(artwork);
    setIsModalOpen(true);
  };

  const loadArtworks = async () => {
    if (!session?.user?.email) return;

    try {
      setLoadingArtworks(true);
      const artworkData = await getArtistArtworks(session?.user?.email);
      setArtworks(Array.isArray(artworkData) ? artworkData : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingArtworks(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, [session]);

  return (
    <div className="space-y-6 mt-6 px-2 sm:px-4 md:px-0 max-w-full">
      <DashboardHeading
        title="Manage Artworks"
        description="View, update and manage all your published artworks"
      />

      {loadingArtworks ? (
        <div className="flex justify-center py-10">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <div className="w-full">
          {/* 📱 MOBILE & SMALL DEVICES VIEW (কার্ড লেআউট) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-[#0C0C14]/80 border border-[#27273A]/60 p-4 rounded-xl space-y-3"
              >
                <div>
                  <h4 className="font-bold text-white text-base">
                    {artwork.title}
                  </h4>
                  <p className="text-xs text-[#8E8E9F] mt-1 line-clamp-2">
                    {artwork.description}
                  </p>
                </div>

                {/* 📅 মোবাইল ভিউতে ৩ কলামের গ্রিড করা হয়েছে (Category, Date, Price) */}
                <div className="grid grid-cols-3 gap-2 text-sm border-t border-[#27273A]/30 pt-3">
                  <div>
                    <span className="text-[10px] text-[#8E8E9F] block mb-0.5">
                      Category
                    </span>
                    <span className="text-[#D1D1DB] font-medium text-xs block truncate">
                      {artwork.category}
                    </span>
                  </div>
                  
                  {/* এই অংশটি নতুন যোগ করা হয়েছে মোবাইলে ডেট দেখানোর জন্য */}
                  <div>
                    <span className="text-[10px] text-[#8E8E9F] block mb-0.5">
                      Date
                    </span>
                    <span className="text-[#D1D1DB] text-xs block font-medium">
                      {artwork.createdAt
                        ? new Date(artwork.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "2-digit", // ছোট স্ক্রিনের জন্য শর্ট বছর (যেমন: '26)
                          })
                        : "N/A"}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#8E8E9F] block mb-0.5">
                      Price
                    </span>
                    <span className="text-[#4ADE80] font-bold text-xs block">
                      ${artwork.price}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[#27273A]/30 pt-3">
                  <div>
                    <Chip size="sm" className="bg-[#B342F2]/15 text-[#D28CFF]">
                      {artwork.status ? "Published" : "Pending"}
                    </Chip>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-1">
                    <Tooltip content="Edit">
                      <Button
                        isIconOnly
                        variant="light"
                        className="min-w-9 w-9 h-9 rounded-xl text-[#A855F7] hover:bg-[#A855F7]/15 hover:text-white transition-all duration-300"
                        onPress={() => handleEditClick(artwork)}
                      >
                        <FiEdit3 size={18} />
                      </Button>
                    </Tooltip>

                    {/* <DeleteArtworkModal
                      id={artwork._id}
                      title={artwork.title}
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP & TABLET VIEW (স্ট্যান্ডার্ড টেবিল লেআউট) */}
          <Card className="bg-[#0C0C14]/60 border border-[#27273A]/40 p-4 rounded-2xl hidden md:block w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#27273A]/50">
                    <th className="p-4 text-xs text-[#8E8E9F]">Artwork</th>
                    <th className="p-4 text-xs text-[#8E8E9F]">Category</th>
                    <th className="p-4 text-xs text-[#8E8E9F]">Date</th>
                    <th className="p-4 text-xs text-[#8E8E9F]">Price</th>
                    <th className="p-4 text-xs text-[#8E8E9F]">Status</th>
                    <th className="p-4 text-xs text-[#8E8E9F] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {artworks.map((artwork) => (
                    <tr
                      key={artwork._id}
                      className="border-b border-[#27273A]/20 hover:bg-[#12121C]/40 transition-colors"
                    >
                      <td className="p-4 text-white max-w-xs">
                        <div>
                          <h4 className="font-semibold truncate">
                            {artwork.title}
                          </h4>
                          <p className="text-xs text-[#8E8E9F] truncate">
                            {artwork.description}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 text-[#D1D1DB]">{artwork.category}</td>
                      <td className="p-4 text-[#D1D1DB]">
                        {artwork.createdAt
                          ? new Date(artwork.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      <td className="p-4 text-[#4ADE80] font-semibold">
                        ${artwork.price}
                      </td>

                      <td className="p-4">
                        <Chip
                          size="sm"
                          className="bg-[#B342F2]/15 text-[#D28CFF]"
                        >
                          {artwork.status ? "Published" : "Pending"}
                        </Chip>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Tooltip content="Edit">
                            <Button
                              isIconOnly
                              variant="light"
                              className="min-w-9 w-9 h-9 rounded-xl text-[#A855F7] hover:bg-[#A855F7]/15 hover:text-white transition-all duration-300"
                              onPress={() => handleEditClick(artwork)}
                            >
                              <FiEdit3 size={18} />
                            </Button>
                          </Tooltip>

                          {/* <DeleteArtworkModal
                            id={artwork._id}
                            title={artwork.title}
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* EDIT MODAL */}
      {/* <EditArtworkModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingEvent={editingEvent}
        loadArtworks={loadArtworks}
      /> */}
    </div>
  );
}