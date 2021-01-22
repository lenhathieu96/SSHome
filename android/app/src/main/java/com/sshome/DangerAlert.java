package com.sshome;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.WindowManager;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactActivity;

public class DangerAlert extends ReactActivity {
    private Ringtone ringtone;
    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
        setContentView(R.layout.danger_alert);
        Uri alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        this.ringtone = RingtoneManager.getRingtone(getApplicationContext(),alert);
        ringtone.setLooping(true);
        ringtone.setVolume(1);
        ringtone.play();
        long[] pattern = { 0, 100, 500, 100, 500, 100, 500, 100, 500, 100, 500};
        Vibrator v =  (Vibrator)getSystemService(this.VIBRATOR_SERVICE);
        v.vibrate(VibrationEffect.createWaveform(pattern, -1));
    }
}
