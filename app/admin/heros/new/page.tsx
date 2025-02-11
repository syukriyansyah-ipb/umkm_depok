'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { UploadDropzone } from '@/lib/uploadthing';
import { Switch } from '@/app/components/ui/switch';
import toast from 'react-hot-toast';
import Loading from '@/app/components/front-end/LoadingSpinner'


const formSchema = z.object({
  title: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  backgroundImageUrl: z.string().min(1, 'Background image is required'),
  socialLinks: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
    shopee: z.string().optional(),
    tokopedia: z.string().optional(),
  }),
  active: z.boolean(),
});

export default function NewProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      backgroundImageUrl: '',
      imageUrl: '',
      socialLinks: {
        instagram: '',
        facebook: '',
        tiktok: '',
        shopee: '',
        tokopedia: '',
      },
      active: true
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/heros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to create hero');
      toast.success('Hero created successfully');
      router.push('/admin/heros');
      router.refresh();
    } catch (error) {
      toast.error('Error creating hero:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
      return <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">New Hero</h1>
      </div>
      <Card className='bg-white p-4 rounded-lg shadow-md'>
        <CardContent className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />               
              </div>
              

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              if (res?.[0]) {
                                field.onChange(res[0].url);
                              }
                            }}
                            onUploadError={(error: Error) => {
                              console.error('Upload error:', error);
                            }}
                            className="p-4 border border-dashed border-gray-300 rounded-lg"
                          />
                          {field.value && (
                            <div className="relative w-full h-48">
                              <img
                                src={field.value}
                                alt="Product preview"
                                className="rounded-lg object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              if (res?.[0]) {
                                field.onChange(res[0].url);
                              }
                            }}
                            onUploadError={(error: Error) => {
                              console.error('Upload error:', error);
                            }}
                            className="p-4 border border-dashed border-gray-300 rounded-lg"
                          />
                          {field.value && (
                            <div className="relative w-full h-48">
                              <img
                                src={field.value}
                                alt="Product preview"
                                className="rounded-lg object-contain w-full h-full"
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="socialLinks.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://instagram.com/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://facebook.com/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiktok URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://tiktok.com/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.tokopedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tokopedia URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://tokopedia.com/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.shopee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shopee URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://shopee.com/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormLabel>Active?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className='bg-gray-500 text-white'
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white">
                  {isLoading ? 'Creating...' : 'Create Hero'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}