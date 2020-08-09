import { withStyles, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import React from 'react';
import GoogleMapReact from 'google-map-react';
// Local
import { googleMapsApiKey } from '../../../../../config';

const styles = (theme) => ({});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.getMarker = this.getMarker.bind(this);
    this.getMarkerFromCdr = this.getMarkerFromCdr.bind(this);
  }

  render() {
    const { selectedJob, selectedJobCdrList } = this.props;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Typography variant='h5' component='h5'>
          <b>Map</b>
        </Typography>

        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={{
            lat: 6.465422,
            lng: 3.406448,
          }}
          defaultZoom={15}
        >
          {selectedJobCdrList.map((cdr) => this.getMarkerFromCdr(cdr))}
        </GoogleMapReact>
      </div>
    );
  }

  getMarker(lat, lng, text) {
    return (
      <HtmlTooltip
        lat={lat}
        lng={lng}
        text={text}
        title={
          <React.Fragment>
            <Typography color='inherit'>Geohash: ASDC45Q</Typography>
            <b>Timestamp: </b>56432345 <br />
            <b>IMSI: </b>9867543287
            <br />
            <b>IMEI: </b>8976573429
            <br />
            <b>MSISDN: </b>8067655543
            <br />
          </React.Fragment>
        }
      >
        <IconButton>
          <Room color='error' fontSize='large' />
        </IconButton>
      </HtmlTooltip>
    );
  }

  getMarkerFromCdr(cdr) {
    let latitude = cdr['locationlat'];
    let longitude = cdr['locationlon'];
    let geohash = cdr['geohash'];
    let timestamp = cdr['timestamp'];
    let imsi = cdr['servedimsi'];
    let imei = cdr['servedimei'];
    let msisdn = cdr['msisdn'];

    return (
      <HtmlTooltip
        lat={latitude}
        lng={longitude}
        text={imsi}
        title={
          <React.Fragment>
            <Typography color='inherit'>Geohash: {geohash}</Typography>
            <b>Timestamp: </b>
            {timestamp} <br />
            <b>IMSI: </b>
            {imsi}
            <br />
            <b>IMEI: </b>
            {imei}
            <br />
            <b>MSISDN: </b>
            {msisdn}
            <br />
          </React.Fragment>
        }
      >
        <IconButton>
          <Room color='error' fontSize='large' />
        </IconButton>
      </HtmlTooltip>
    );
  }
}

export default withStyles(styles)(DataMap);
