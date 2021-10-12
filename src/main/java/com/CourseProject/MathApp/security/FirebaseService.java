package com.CourseProject.MathApp.security;

import com.google.cloud.storage.Bucket;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class FirebaseService {

    public FirebaseToken getDecodedToken(HttpServletRequest request) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(request.getHeader("idToken"));
    }

    public Bucket getStorage() {
        return StorageClient.getInstance().bucket();
    }

}
