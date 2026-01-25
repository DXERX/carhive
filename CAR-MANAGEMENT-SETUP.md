# Car Management Feature - Setup Guide

## Overview
The car management interface has been successfully implemented. This allows admins to:
- View all cars in a grid layout
- Add new cars with image upload
- Edit existing cars (name, description, price, specifications, images)
- Delete cars with confirmation
- Upload images directly to Cloudinary

## Features
- ✅ Full CRUD operations for cars
- ✅ Image upload with Cloudinary
- ✅ Real-time updates after changes
- ✅ Form validation
- ✅ Admin-only access
- ✅ Toast notifications for success/error

## File Structure
```
/workspaces/carhive/
├── app/(app)/admin/cars/
│   ├── page.tsx                     # Main car management page
│   ├── actions.ts                   # Server actions (create/update/delete)
│   └── components/
│       ├── car-list.tsx             # Grid display of all cars
│       ├── add-car-dialog.tsx       # Dialog to add new car
│       ├── edit-car-dialog.tsx      # Dialog to edit existing car
│       └── delete-car-dialog.tsx    # Confirmation dialog for deletion
├── db/queries/
│   └── car-repository-admin.ts      # Database CRUD functions
└── components/ui/
    ├── select.tsx                   # Select dropdown component
    └── textarea.tsx                 # Textarea component
```

## Cloudinary Upload Preset Setup

**IMPORTANT**: You need to create an upload preset in your Cloudinary account for image uploads to work.

### Steps:
1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Set the following:
   - **Preset name**: `carhive`
   - **Signing mode**: `Unsigned` (important!)
   - **Folder**: `carhive/cars` (optional but recommended)
   - **Format**: Auto
   - **Transformation**: Optional (can add image optimization)
6. Click **Save**

### Alternative: Update the preset name in code
If you already have an unsigned upload preset, update it in:
- `/app/(app)/admin/cars/components/add-car-dialog.tsx` (line 75)
- `/app/(app)/admin/cars/components/edit-car-dialog.tsx` (line 77)

Change:
```tsx
uploadPreset="carhive"
```
To:
```tsx
uploadPreset="YOUR_PRESET_NAME"
```

## Access the Car Management Interface

1. **Start the dev server** (if not already running):
   ```bash
   pnpm dev
   ```

2. **Login as admin**:
   - Go to http://localhost:3000/sign-in
   - Sign in with: `hak4rgof120876@gmail.com`

3. **Access car management**:
   - Go to http://localhost:3000/admin
   - Click "Manage Cars" button
   - Or navigate directly to http://localhost:3000/admin/cars

## Usage

### Adding a New Car
1. Click "Add New Car" button
2. Fill in all required fields:
   - Car Name (e.g., "Tesla Model 3")
   - Description
   - Price Per Day (number)
   - Body Style (dropdown)
   - Powertrain (dropdown)
   - Transmission (dropdown)
   - Seats (number)
   - Optional: Currency, Rating, Features
3. Click "Upload Image" to add a car photo
4. Click "Add Car" to save

### Editing a Car
1. Click "Edit" button on any car card
2. Modify fields as needed
3. Click "Upload New Image" to change the photo
4. Click "Save Changes"

### Deleting a Car
1. Click "Delete" button on any car card
2. Confirm deletion in the dialog
3. Car will be permanently removed

## Technical Details

### Schema Types
All fields match the database schema:
- `pricePerDay`: decimal (stored as string)
- `rating`: decimal (stored as string)
- `reviewCount`: text (stored as string)
- `seats`: integer
- `features`: text[] (array of strings)

### Image Storage
- Images are uploaded to Cloudinary
- Public ID is stored in `imageUrl` field
- Images are displayed using `CldImage` component
- Supports transformation and optimization

### Admin Authentication
- Only emails in `ADMIN_EMAILS` env variable can access
- Current admin: `hak4rgof120876@gmail.com`
- To add more admins, update `.env`:
  ```
  ADMIN_EMAILS=hak4rgof120876@gmail.com,another@email.com
  ```

## Next Steps

1. ✅ **Create Cloudinary upload preset** (see above)
2. ✅ Test adding a new car with image
3. ✅ Test editing existing cars
4. ✅ Test deleting cars
5. Optional: Seed some test cars to the database

## Testing the Feature

```bash
# 1. Make sure dev server is running
pnpm dev

# 2. Visit the admin dashboard
# http://localhost:3000/admin

# 3. Click "Manage Cars" button

# 4. Try adding a new car with an image
```

## Troubleshooting

### "Upload preset not found" error
- Make sure you created the `carhive` upload preset in Cloudinary
- Verify it's set to "Unsigned" mode

### Images not displaying
- Check that the Cloudinary cloud name is correct in `.env`
- Verify the image public ID is valid

### "Unauthorized" error
- Make sure you're logged in with the admin email
- Check `ADMIN_EMAILS` in `.env`

### Type errors in forms
- All numeric fields are converted to strings to match the schema
- Features should be comma-separated (e.g., "GPS, Bluetooth, AC")

## Related Files Modified
- ✅ Created car management UI components
- ✅ Created server actions for CRUD operations
- ✅ Created car repository admin functions
- ✅ Added Select and Textarea components
- ✅ Updated admin dashboard with "Manage Cars" button
- ✅ Fixed all TypeScript type errors
