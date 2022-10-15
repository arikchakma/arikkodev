import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Writing',
  filePathPattern: `writing/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post],
});
