# SEFT-parser

SEFT-parser is an image parser for reading Samsung trailer metadata.

This package was written thanks to the analysis that Dr. Neal Krawetz performed and wrote in [this blog post](https://www.hackerfactor.com/blog/index.php?/archives/1039-Reversing-Samsung-Metadata.html)

## Installation

``` bash
npm i seft-parser
```

## Vocabulary

* `Record` - a type of data.
* `Content` - the data in a specific record
* `Value` - the actual value of a record

## Usage

Initialize the parser with an image file or image data:

```ts
const seft = new Seft('your/path/to/image')
// or
const seft = new Seft(image: ArrayBuffer)
```

### Reading metadata

After initialized, you can get a quick access to the metadata in a key:value format by the `getMetadata` method:

```ts
console.log(seft.getMetadata)

// result:
// {
//     Image_UTC_Data: '2023-12-13 14:41:28.110 GMT',
//     Camera_Capture_Mode_Info: '3'
//     ...
// }
```

### Parser

#### Seft class

The `seft` object includes the next object:

* *`seftVersion`: number* - indicates the version of the current seft block in the image
* *`recordsCount`: number* - indicates the number of metadata fields recognized in the current seft block in the image.
* *`records`: SeftRecord* - an object containing all the metadata records in the current SEFT segment and relevant data about them.
* *`seftMarkerOffset`: number* - indicates the offset of the SEFT marker from the start of the file
* *`sefhMarkerOffset`: number* - indicates the offset of the SEFH marker from the start of the file
* *`headersBlockStartOffset`: number* - indicates the offset of the starting point of the SEFT headers block from the start of the file. this will normally be the same offset as the `sefhMarkerOffset`.
* *`headersBlockEndOffset`: number* - indicates the offset of the ending point of the SEFT headers block from the start of the file. this will normally be equal to the offset of `seftMarkerOffset` + `4`.
* *`headersBlockLength`: number* - indicate the length of the headers block in bytes, from the `headersBlockStartOffset` to `headersBlockEndOffset`.
* *`segmentData`: ArrayBuffer* - contains only the data of the SEFT metadata segment.

#### SeftRecord class

The `SeftRecord` object includes the next object:

* *`padding`: string* - a hex string value of the first two bytes in each record. Mainly be zero value.
* *`type`: string* - a hex string value that represent the record type of data.
* *`offsetToContent`: number* - an offset indicate the starting point of the actual content of the record. This offset is the number of bytes from the `sefhMarkerOffset` backwards.
* *`contentLen`: number* - the record content length in bytes.
* *`content`: SeftRecordContent* - an object containing all the data about the content of the record.

#### SeftRecordContent class

The `SeftRecordContent` object includes the next object:

* *`padding`: string* - a hex string value of the first two bytes in each record content. Mainly be zero value.
* *`recordType`: string* - a hex string value that represent the record type of data. this should be the same as `SeftRecord.type` of the current record.
* *`dataType`: string* - a string value represents the how this record content data will be parse to a readable value.
* *`contentLen`: number* - the length of the content of the current record in bytes.
* *`recordNameLen`: number* - the length of the record name of the current record in bytes.
* *`recordName`: string* - the name of the current record.
* *`recordRawData`: ArrayBuffer* - row data value of the whole record content.
* *`value`: any* - the content of the record parsed to a readable value (if known).
* *`isDOFSRecord`: boolean* - a flag indicates if the content is an instance of `DOFS` record. (*currently there is no support in parsing `DOFS` content*)

## Error handling

### No SEFT metadata

If the image / data you provided does not includes any SEFT marker, an error will thrown up with the text `Error: No SEFT segment in this data`
