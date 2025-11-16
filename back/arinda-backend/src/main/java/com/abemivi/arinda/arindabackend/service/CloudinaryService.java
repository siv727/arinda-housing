package com.abemivi.arinda.arindabackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * Upload a single image to Cloudinary
     * 
     * @param file   The image file to upload
     * @param folder The folder to store the image in (e.g., "listings")
     * @return The URL of the uploaded image
     */
    public String uploadImage(MultipartFile file, String folder) throws IOException {
        @SuppressWarnings("unchecked")
        Map<String, Object> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folder,
                        "resource_type", "auto"));
        return uploadResult.get("secure_url").toString();
    }

    /**
     * Upload multiple images to Cloudinary
     * 
     * @param files  List of image files to upload
     * @param folder The folder to store the images in
     * @return List of URLs of uploaded images
     */
    public List<String> uploadImages(List<MultipartFile> files, String folder) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            String url = uploadImage(file, folder);
            urls.add(url);
        }
        return urls;
    }

    /**
     * Delete an image from Cloudinary
     * 
     * @param publicId The public ID of the image (extracted from URL)
     */
    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    /**
     * Extract public ID from Cloudinary URL
     * 
     * @param imageUrl The full Cloudinary URL
     * @return The public ID
     */
    public String extractPublicId(String imageUrl) {
        // Example URL:
        // https://res.cloudinary.com/demo/image/upload/v1234567890/listings/photo1.jpg
        // Extract: listings/photo1
        String[] parts = imageUrl.split("/upload/");
        if (parts.length > 1) {
            String afterUpload = parts[1];
            // Remove version number (v1234567890/)
            String withoutVersion = afterUpload.replaceFirst("v\\d+/", "");
            // Remove file extension
            return withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
        }
        return null;
    }
}
