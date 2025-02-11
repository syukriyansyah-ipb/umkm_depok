'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';
import LoadingSpinner from '@/app/components/front-end/LoadingSpinner';
import { use } from 'react';


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
  active: z.boolean().optional(),
});

export default function EditHero({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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
      active: true,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroResponse] = await Promise.all([
          fetch(`/api/heros/${resolvedParams.id}`),
        ]);

        if (!heroResponse.ok) {
          throw new Error('Failed to fetch hero');
        }

     
        const hero = await heroResponse.json();

        form.reset({
          title: hero.title,
          description: hero.description,
          backgroundImageUrl: hero.backgroundImageUrl,
          imageUrl: hero.imageUrl,
          socialLinks: {
            instagram: hero.socialLinks?.instagram || '',
            facebook: hero.socialLinks?.facebook || '',
            tiktok: hero.socialLinks?.tiktok || '',
            tokopedia: hero.socialLinks?.tokopedia || '',
            shopee: hero.socialLinks?.shopee || '',
          }
        });
      } catch (error) {
        toast.error('Failed to load hero data');
        console.error('Error fetching data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values); // Tambahkan ini untuk debugging
    try {
      setIsLoading(true);
      const response = await fetch(`/api/heros/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to update hero');

      toast.success('Hero updated successfully');
      router.push('/admin/heros');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update hero');
      console.error('Error updating hero:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Update Hero</h1>
      </div>
      <Card className="p-4 bg-white rounded-lg shadow-md py-5">
        
        <CardContent>
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
                                toast.success('Image uploaded successfully');
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error('Failed to upload image');
                              console.error('Upload error:', error);
                            }}
                          />
                          {field.value && (
                            <div className="relative w-full h-48">
                              <img
                                src={field.value}
                                alt="Hero preview"
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
                                toast.success('Image uploaded successfully');
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error('Failed to upload image');
                              console.error('Upload error:', error);
                            }}
                          />
                          {field.value && (
                            <div className="relative w-full h-48">
                              <img
                                src={field.value}
                                alt="Background preview"
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
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className='bg-blue-500 text-white'>
                  {isLoading ? 'Updating...' : 'Update Hero'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}