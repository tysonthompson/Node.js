.mode column
.header on
.width 8 12 23
select album_id,track_number,compositions.title
from
album_tracks join recordings on album_tracks.recording_id = recordings.recording_id
Join compositions on recordings.song_id = compositions.song_id
where album_id = 105;