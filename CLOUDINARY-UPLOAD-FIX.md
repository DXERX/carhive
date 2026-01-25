# Cloudinary Upload Preset Setup - Quick Fix

## The Problem
The Cloudinary upload widget opens but uploads fail because the upload preset "carhive" doesn't exist or isn't configured correctly.

## The Solution - Create Upload Preset

### Step-by-Step Instructions:

1. **Open Cloudinary Console**
   - Go to: https://console.cloudinary.com/
   - Login with your account (cloud name: drjt9tb7x)

2. **Navigate to Upload Settings**
   - Click on the **gear icon** (Settings) in the top right
   - Click on **Upload** tab in the left sidebar
   - Scroll down to **Upload presets** section

3. **Create New Upload Preset**
   - Click **"Add upload preset"** button
   
4. **Configure the Preset**
   ```
   Preset name: carhive
   Signing mode: Unsigned ⚠️ (IMPORTANT - must be Unsigned!)
   Folder: carhive/cars (optional but recommended)
   
   Under "Incoming transformations":
   - Format: Auto
   - Quality: Auto
   
   Under "Edit details":
   - Unique filename: true (recommended)
   ```

5. **Save the Preset**
   - Click **"Save"** at the top right

## Verification

After creating the preset, refresh your browser and try uploading again. You should see:

1. Upload widget opens
2. Select an image
3. Image uploads successfully
4. Success toast: "Image uploaded - Car image uploaded successfully"
5. Button changes to "Change Image"

## Troubleshooting

### If upload still fails:

**Check Browser Console (F12)**
- Look for error messages
- Common errors:
  - "Upload preset not found" → Preset name is wrong or doesn't exist
  - "Unsigned upload denied" → Preset is not set to "Unsigned" mode
  - "Invalid signature" → Preset is in "Signed" mode (must be Unsigned)

### Verify Environment Variables
Check your `.env` file has:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drjt9tb7x
```

### Test Upload Preset
You can test if the preset works using this curl command:
```bash
curl -X POST \
  https://api.cloudinary.com/v1_1/drjt9tb7x/image/upload \
  -F "file=@/path/to/test-image.jpg" \
  -F "upload_preset=carhive"
```

If this returns JSON with "secure_url", the preset is working!

## Alternative: Use Existing Preset

If you already have an unsigned upload preset, you can use it instead:

1. Find your existing unsigned preset in Cloudinary Console → Settings → Upload
2. Update the code in these files:
   - `/app/(app)/admin/cars/components/add-car-dialog.tsx`
   - `/app/(app)/admin/cars/components/edit-car-dialog.tsx`
   
   Change:
   ```tsx
   uploadPreset="carhive"
   ```
   To:
   ```tsx
   uploadPreset="YOUR_EXISTING_PRESET_NAME"
   ```

## Quick Reference

**Cloudinary Console**: https://console.cloudinary.com/console/settings/upload
**Your Cloud Name**: drjt9tb7x
**Required Preset Name**: carhive
**Required Mode**: Unsigned

---

After setting this up, the image upload should work perfectly! 🎉
