package com.sshome;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactActivity;

public class DangerAlert extends ReactActivity {
    Button btn_call;
    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
        setContentView(R.layout.danger_alert);
        Uri alert = Uri.parse("android.resource://"
                + this.getPackageName() + "/" + R.raw.fire_alert);
        Ringtone ringtone = RingtoneManager.getRingtone(getApplicationContext(),alert);
        ringtone.setLooping(true);
        ringtone.setVolume(1);
        ringtone.play();
        long[] pattern = { 0, 1000, 200};
        Vibrator v =  (Vibrator)getSystemService(this.VIBRATOR_SERVICE);
        v.vibrate(VibrationEffect.createWaveform(pattern, 0));
        btn_call = (Button)findViewById(R.id.btn_call);
        btn_call.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
             ringtone.stop();
             v.cancel();
            }
        });
    }
}
