
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Upload, Filter, Image } from "lucide-react";

const ApiTestPage = () => {
  const [responses, setResponses] = useState<{ endpoint: string; response: any }[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [imageId, setImageId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const addResponse = (endpoint: string, response: any) => {
    setResponses(prev => [{
      endpoint,
      response: typeof response === 'object' ? response : { data: response }
    }, ...prev]);
  };

  const testGetImages = async (filter?: 'true' | 'false' | 'unmarked') => {
    try {
      setLoading('getImages');
      const result = await api.getImages(filter);
      addResponse(`GET /images${filter ? `?marking=${filter}` : ''}`, result);
      toast({
        title: "Success",
        description: "Retrieved images successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get images",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const testGetUnmarked = async () => {
    try {
      setLoading('getUnmarked');
      const result = await api.getUnmarkedImage();
      addResponse('GET /unmarked', result);
      toast({
        title: "Success",
        description: "Retrieved unmarked image successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get unmarked image",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const testMarkImage = async (id: string, marking: boolean) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Please enter an image ID",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading('markImage');
      const result = await api.markImage(id, marking);
      addResponse(`PUT /mark/${id}`, result);
      toast({
        title: "Success",
        description: "Marked image successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark image",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const testUploadImage = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading('uploadImage');
      const formData = new FormData();
      formData.append('image', file);
      const result = await api.uploadImage(formData);
      addResponse('POST /upload', result);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Dashboard</h1>

        <div className="grid gap-8">
          {/* Get Images Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Get Images</h2>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => testGetImages()}
                disabled={loading === 'getImages'}
                variant="outline"
              >
                <Filter className="mr-2 h-4 w-4" />
                Get All Images
              </Button>
              <Button
                onClick={() => testGetImages('unmarked')}
                disabled={loading === 'getImages'}
                variant="outline"
              >
                Get Unmarked
              </Button>
              <Button
                onClick={() => testGetImages('true')}
                disabled={loading === 'getImages'}
                variant="outline"
              >
                Get Approved
              </Button>
              <Button
                onClick={() => testGetImages('false')}
                disabled={loading === 'getImages'}
                variant="outline"
              >
                Get Rejected
              </Button>
            </div>
          </div>

          {/* Get Unmarked Image Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Get Unmarked Image</h2>
            <Button
              onClick={testGetUnmarked}
              disabled={loading === 'getUnmarked'}
              variant="outline"
            >
              <Image className="mr-2 h-4 w-4" />
              Get One Unmarked Image
            </Button>
          </div>

          {/* Mark Image Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Mark Image</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter Image ID"
                  value={imageId}
                  onChange={(e) => setImageId(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <Button
                onClick={() => testMarkImage(imageId, true)}
                disabled={loading === 'markImage'}
                variant="outline"
                className="whitespace-nowrap"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Approved
              </Button>
              <Button
                onClick={() => testMarkImage(imageId, false)}
                disabled={loading === 'markImage'}
                variant="outline"
                className="whitespace-nowrap"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Mark Rejected
              </Button>
            </div>
          </div>

          {/* Upload Image Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-gray-700 border-gray-600"
                  accept="image/*"
                />
              </div>
              <Button
                onClick={testUploadImage}
                disabled={loading === 'uploadImage'}
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>

          {/* Response Log Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Response Log</h2>
            <div className="space-y-4">
              {responses.map((response, index) => (
                <div key={index} className="bg-gray-700 rounded p-4">
                  <div className="font-mono text-sm text-green-400 mb-2">
                    {response.endpoint}
                  </div>
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(response.response, null, 2)}
                  </pre>
                </div>
              ))}
              {responses.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No responses yet. Test an endpoint to see results.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;
