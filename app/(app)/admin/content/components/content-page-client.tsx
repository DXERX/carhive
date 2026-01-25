"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Image, Palette, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateHeroContent, updateFeatures, updateSEO, updateAboutContent } from "../actions"

interface ContentPageClientProps {
  content: any
  userEmail: string
}

export function ContentPageClient({ content, userEmail }: ContentPageClientProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const [heroContent, setHeroContent] = useState({
    heroTitle: content.heroTitle,
    heroSubtitle: content.heroSubtitle,
  })

  const [featuresContent, setFeaturesContent] = useState({
    feature1Title: content.feature1Title,
    feature1Description: content.feature1Description,
  })

  const [seoContent, setSeoContent] = useState({
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
  })

  const [aboutContent, setAboutContent] = useState({
    aboutTitle: content.aboutTitle,
    aboutContent: content.aboutContent,
  })

  const handleHeroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateHeroContent(formData)
      toast({
        title: result.success ? "Success" : "Error",
        description: result.success ? result.message : result.error,
        variant: result.success ? "default" : "destructive",
      })
    })
  }

  const handleFeaturesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateFeatures(formData)
      toast({
        title: result.success ? "Success" : "Error",
        description: result.success ? result.message : result.error,
        variant: result.success ? "default" : "destructive",
      })
    })
  }

  const handleSEOSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateSEO(formData)
      toast({
        title: result.success ? "Success" : "Error",
        description: result.success ? result.message : result.error,
        variant: result.success ? "default" : "destructive",
      })
    })
  }

  const handleAboutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("userEmail", userEmail)

    startTransition(async () => {
      const result = await updateAboutContent(formData)
      toast({
        title: result.success ? "Success" : "Error",
        description: result.success ? result.message : result.error,
        variant: result.success ? "default" : "destructive",
      })
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground mt-2">Manage website content, images, and text</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Hero Section
            </CardTitle>
            <CardDescription>Edit landing page hero content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleHeroSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  name="heroTitle"
                  value={heroContent.heroTitle}
                  onChange={(e) => setHeroContent({ ...heroContent, heroTitle: e.target.value })}
                  placeholder="Hero title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  name="heroSubtitle"
                  value={heroContent.heroSubtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, heroSubtitle: e.target.value })}
                  placeholder="Hero subtitle..."
                  rows={2}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save Hero Content"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="size-5" />
              Images
            </CardTitle>
            <CardDescription>Manage website images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center">
                <Image className="text-muted-foreground mx-auto mb-3 size-12" />
                <p className="text-muted-foreground mb-3 text-sm">
                  Upload hero image, logos, or banners
                </p>
                <Button variant="outline" disabled>
                  Upload Image (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5" />
              Features Section
            </CardTitle>
            <CardDescription>Edit features and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeaturesSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feature1Title">Feature 1</Label>
                <Input
                  id="feature1Title"
                  name="feature1Title"
                  value={featuresContent.feature1Title}
                  onChange={(e) => setFeaturesContent({ ...featuresContent, feature1Title: e.target.value })}
                  placeholder="Feature title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature1Description">Description</Label>
                <Input
                  id="feature1Description"
                  name="feature1Description"
                  value={featuresContent.feature1Description}
                  onChange={(e) => setFeaturesContent({ ...featuresContent, feature1Description: e.target.value })}
                  placeholder="Description..."
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save Features"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* SEO & Meta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-5" />
              SEO & Meta
            </CardTitle>
            <CardDescription>Search engine optimization settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSEOSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={seoContent.metaTitle}
                  onChange={(e) => setSeoContent({ ...seoContent, metaTitle: e.target.value })}
                  placeholder="Meta title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={seoContent.metaDescription}
                  onChange={(e) => setSeoContent({ ...seoContent, metaDescription: e.target.value })}
                  placeholder="Meta description..."
                  rows={2}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save SEO Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Edit the about section content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAboutSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">About Title</Label>
              <Input
                id="aboutTitle"
                name="aboutTitle"
                value={aboutContent.aboutTitle}
                onChange={(e) => setAboutContent({ ...aboutContent, aboutTitle: e.target.value })}
                placeholder="Title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutContent">About Content</Label>
              <Textarea
                id="aboutContent"
                name="aboutContent"
                value={aboutContent.aboutContent}
                onChange={(e) => setAboutContent({ ...aboutContent, aboutContent: e.target.value })}
                placeholder="About content..."
                rows={6}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save About Content"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border bg-green-50 p-4 text-green-900">
        <p className="text-sm">
          <strong>✓ All content forms are now fully functional!</strong> Content is saved in memory. For production,
          connect these to a database table and update your homepage components to use this dynamic content.
        </p>
      </div>
    </div>
  )
}
